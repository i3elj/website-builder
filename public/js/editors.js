import { get_tag_name, str_to_html } from './html_manipulation.js'

const editors_wrapper = htmx.find('#__editors-wrapper');

const html_editor_wrapper = htmx.find('#__html-wrapper');
const css_editor_wrapper = htmx.find('#__css-wrapper');

// const css_close_btn = htmx.find('#__css-close-btn')
// css_close_btn.onclick = deactivate_editor()

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
		const options = {parser: 'html', plugins: prettierPlugins};
		const formatted_code = await prettier.format(element.outerHTML, options);

		const html_session = ace.createEditSession(formatted_code);
		editor.setSession(html_session);
		editor.session.setMode('ace/mode/html');

		editors_wrapper.style.display = 'flex';
		html_editor_wrapper.style.display = 'flex';

		const title = htmx.find('#__html-titlebar p');
		title.innerText = get_tag_name(element);
	})()

	htmx.find('#__html-close-btn').onclick = deactivate_editor;
	htmx.find('#__html-save-btn').onclick = (event) => {
		const code = editor.getValue();
		const html_code = str_to_html(code);
		element.replaceWith(html_code);
	}
}

function deactivate_editor(event)
{
	editors_wrapper.style.display = 'none';
	html_editor_wrapper.style.display = 'none';
	css_editor_wrapper.style.display = 'none';
}
