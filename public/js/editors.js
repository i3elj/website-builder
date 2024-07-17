const editorWrapper = element("#__editors-wrapper");
const editorHtmlWrapper = element("#__html-wrapper");
const editorCssWrapper = element("#__css-wrapper");

const editorOptions = {
    theme: "ace/theme/xcode",
    fontFamily: "IBM Plex Mono",
    fontSize: "18pt",
};

function editors_html(target) {
    const editor = ace.edit("__html");
    editor.setOptions(editorOptions);

    (async () => {
        const formatted_code = await prettier.format(target.outerHTML, {
            parser: "html",
            plugins: prettierPlugins,
        });

        const session = ace.createEditSession(formatted_code);
        editor.setSession(session);
        editor.session.setMode("ace/mode/html");

        editorWrapper.style.display = "flex";
        editorHtmlWrapper.style.display = "flex";

        const title = element("#__html-titlebar p");
        title.innerText = html_getTagName(target);
    })();

    const btn_close = element("#__html-close-btn");
    const btn_save = element("#__html-save-btn");

    btn_close.onclick = deactivate_editors;
    btn_save.onclick = () => {
        const code = editor.getValue();
        const html_code = html_strToHtml(code);
        target.replaceWith(html_code);
    };
}

function editors_css(target) {
    const beautify = ace.require("ace/ext/beautify");
    const editor = ace.edit("__css");
    editor.setOptions(editorOptions);

    var code = target.style.cssText.replace(/;[ ]?/g, "\n");

    const session = ace.createEditSession(code);
    editor.setSession(session);
    editor.session.setMode("ace/mode/yaml");

    activateEditor(editorCssWrapper);
    setEditorTitle("css", target);

    const btn_close = element("#__css-close-btn");
    const btn_save = element("#__css-save-btn");

    btn_close.onclick = deactivate_editors;
    btn_save.onclick = () => {
        var code = editor.getValue();
        code = code.replace(/\n/g, ";");
        target.style = code;
    };
}

function editors_cssClass(target, className) {
    const editor = ace.edit("__css");
    editor.setOptions(editorOptions);

    const code = target.textContent
                          .replace(/^.+? ?{|}/gm, "")
                          .replace(/;/gm, "\n");
    const session = ace.createEditSession(code);
    editor.setSession(session);
    editor.session.setMode("ace/mode/yaml");

    activateEditor(editorCssWrapper);
    setEditorTitle("css", target);

    const btn_close = element("#__css-close-btn");
    const btn_save = element("#__css-save-btn");

    btn_close.onclick = deactivate_editors;
    btn_save.onclick = () => {
        var code = editor.getValue();
        code = code.replace(/\n/g, ";");
        target.textContent = `${className} {${code}}`;
    };
}

function deactivate_editors(event) {
    editorWrapper.style.display = "none";
    editorHtmlWrapper.style.display = "none";
    editorCssWrapper.style.display = "none";
}

function activateEditor(localWrapper) {
    editorWrapper.style.display = "flex";
    localWrapper.style.display = "flex";
}

function setEditorTitle(editorName, element) {
    const title = element(`#__${editorName}-titlebar p`);
    title.innerText = html_getTagName(element);

    var classlist = Array.from(element.classList).filter(
        (c) => !c.startsWith("__"),
    );
    if (classlist.length != 0) title.innerText += " ." + classlist.join(" .");
}

function find_or_create_style(id) {
    var style = element("style#" + id);

    if (style == null) {
        style = document.createElement("style");
        style.id = id;
        const body = element("body");
        body.insertBefore(style, body.firstChild);
    }

    return style;
}

function get_rules(content, rule_type, match) {
    var regex_str =
        rule_type == "id"
        ? `\\#[${match}][\\s\\S]*?}`
        : `\\.[${match.join("|")}][\\s\\S]*?}`;

    const regex = new RegExp(regex_str, "gm");
    const result = [...content.matchAll(regex)];
    return result.join("\n");
}
