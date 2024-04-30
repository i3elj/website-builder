import { get_tag_name, str_to_html } from './html_manipulation.js'

const edt_wrapper = htmx.find('#__editors-wrapper');
const edt_html_wrapper = htmx.find('#__html-wrapper');
const edt_css_wrapper = htmx.find('#__css-wrapper');

const edt_options = {
    theme: 'ace/theme/xcode',
    fontFamily: 'IBM Plex Mono',
    fontSize: '18pt'
}

export function html(target_el)
{
    const editor = ace.edit('__html');
    editor.setOptions(edt_options);

    // activation step
    (async () => {
        const formatted_code = await prettier.format(target_el.outerHTML, {
            parser: 'html',
            plugins: prettierPlugins
        });

        const session = ace.createEditSession(formatted_code);
        editor.setSession(session);
        editor.session.setMode('ace/mode/html');

        edt_wrapper.style.display = 'flex';
        edt_html_wrapper.style.display = 'flex';

        const title = htmx.find('#__html-titlebar p');
        title.innerText = get_tag_name(target_el);
    })()

    const btn_close = htmx.find('#__html-close-btn')
    const btn_save = htmx.find('#__html-save-btn')

    btn_close.onclick = deactivate_editors;
    btn_save.onclick = () => {
        const code = editor.getValue();
        const html_code = str_to_html(code);
        target_el.replaceWith(html_code);
    }
}

export function css(target_el)
{
    const beautify = ace.require('ace/ext/beautify');
    const editor = ace.edit('__css');
    editor.setOptions(edt_options);

    var code = target_el.style.cssText.replace(/;[ ]?/g, '\n');

    const session = ace.createEditSession(code);
    editor.setSession(session);
    editor.session.setMode('ace/mode/yaml');

    activateEditor(edt_css_wrapper);
    setEditorTitle('css', target_el)

    const btn_close = htmx.find('#__css-close-btn')
    const btn_save = htmx.find('#__css-save-btn')

    btn_close.onclick = deactivate_editors;
    btn_save.onclick = () => {
        var code = editor.getValue();
        code = code.replace(/\n/g, ';');
        target_el.style = code;
    }
}

export function cssClass(target_el, className)
{
    const beautify = ace.require('ace/ext/beautify');
    const editor = ace.edit('__css');
    editor.setOptions(edt_options);

    const code = target_el.textContent
                          .replace(/^.+? ?{|}/gm, '')
                          .replace(/;/gm,'\n');
    const session = ace.createEditSession(code);
    editor.setSession(session);
    editor.session.setMode('ace/mode/yaml');

    activateEditor(edt_css_wrapper);
    setEditorTitle('css', target_el)

    const btn_close = htmx.find('#__css-close-btn')
    const btn_save = htmx.find('#__css-save-btn')

    btn_close.onclick = deactivate_editors;
    btn_save.onclick = () => {
        var code = editor.getValue();
        code = code.replace(/\n/g, ';');
        target_el.textContent = `${className} {${code}}`;
    }
}

function deactivate_editors(event)
{
    edt_wrapper.style.display = 'none';
    edt_html_wrapper.style.display = 'none';
    edt_css_wrapper.style.display = 'none';
}

function activateEditor(localWrapper)
{
    edt_wrapper.style.display = 'flex';
    localWrapper.style.display = 'flex';
}

function setEditorTitle(editorName, element)
{
    const title = htmx.find(`#__${editorName}-titlebar p`);
    title.innerText = get_tag_name(element)

    var classlist = Array.from(element.classList)
                         .filter(c => !c.startsWith("__"));
    if (classlist.length != 0)
        title.innerText += " ." + classlist.join(" .");
}

function find_or_create_style(id)
{
    var style = htmx.find('style#' + id);

    if (style == null) {
        style = document.createElement('style');
        style.id = id;
        const body = htmx.find('body');
        body.insertBefore(style, body.firstChild);
    }

    return style;
}

function get_rules(content, rule_type, match)
{
    var regex_str = rule_type == 'id'
                  ? `\\#[${match}][\\s\\S]*?}`
                  : `\\.[${match.join('|')}][\\s\\S]*?}`;

    const regex = new RegExp(regex_str, 'gm');
    const result = [...content.matchAll(regex)];
    return result.join('\n');
}
