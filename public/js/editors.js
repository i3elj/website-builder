import { get_tag_name, str_to_html } from './html_manipulation.js'

const editors_wrapper = htmx.find('#__editors-wrapper');
const html_editor_wrapper = htmx.find('#__html-wrapper');
const css_editor_wrapper = htmx.find('#__css-wrapper');

// const css_close_btn = htmx.find('#__css-close-btn')
// css_close_btn.onclick = deactivate_editors()

export function html(element)
{
    const editor = ace.edit('__html');

    editor.setOptions({
        theme: 'ace/theme/monokai',
        fontFamily: 'Iosevka NF',
        fontSize: '18pt'
    });

    // activation step
    (async () => {
        const formatted_code = await prettier.format(element.outerHTML, {
            parser: 'html',
            plugins: prettierPlugins
        });

        const html_session = ace.createEditSession(formatted_code);
        editor.setSession(html_session);
        editor.session.setMode('ace/mode/html');

        editors_wrapper.style.display = 'flex';
        html_editor_wrapper.style.display = 'flex';

        const title = htmx.find('#__html-titlebar p');
        title.innerText = get_tag_name(element);
    })()

    htmx.find('#__html-close-btn').onclick = deactivate_editors;
    htmx.find('#__html-save-btn').onclick = (event) => {
        const code = editor.getValue();
        const html_code = str_to_html(code);
        element.replaceWith(html_code);
    }
}

export function css(element)
{
    const beautify = ace.require('ace/ext/beautify');
    const editor = ace.edit('__css');

    editor.setOptions({
        theme: 'ace/theme/monokai',
        fontFamily: 'Iosevka NF',
        fontSize: '18pt'
    });

    // activation step
    (async () => {
        const el_style_tag = find_or_create_style(element.dataset.id);

        const global_style_tag = htmx.find('#__user-global-css');
        const global_styles = get_rules(
            global_style_tag,
            Array.from(element.classList)
                 .filter(c => !c.startsWith('__'))
        );

        const code =
            "\n/*- global styles -*/"
            + global_styles
            + "\n\n"
            + "/*- element specific styles -*/"
            + el_style_tag.textContent;

            const formatted_code = await prettier.format(code, {
                parser: 'css',
                plugins: prettierPlugins
            });

        const css_session = ace.createEditSession(formatted_code);

        editor.setSession(css_session);
        editor.session.setMode('ace/mode/css');

        editors_wrapper.style.display = 'flex';
        css_editor_wrapper.style.display = 'flex';

        const title = htmx.find('#__css-titlebar p');
        title.innerText = get_tag_name(element);
    })()

    htmx.find('#__css-close-btn').onclick = deactivate_editors;
    htmx.find('#__css-save-btn').onclick = () => {
        element.textContent = editor.getValue();
    }
}

function deactivate_editors(event)
{
    editors_wrapper.style.display = 'none';
    html_editor_wrapper.style.display = 'none';
    css_editor_wrapper.style.display = 'none';
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

function get_rules(element, classes)
{
    const rules = element.textContent;
    const class_regex = classes.join('|');
    const regex_str = `.${class_regex}\\s{[\\s\\S]*?}`;
    const regex = new RegExp(regex_str, 'gm');
    const result = [...rules.matchAll(regex)];
    return result.join('\n');
}
