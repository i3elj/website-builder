export function create_unique_id()
{
	const id_list = Array.from(htmx.findAll('.__item'))
						 .map(e => get_id(e).split('-')[1])

	if (id_list.length == 0)
		return '__item-1'

	return '__item-' + (Math.max(...id_list) + 1)
}

export function get_id(elem) { return elem.classList[0] }

export function add_id(elem, id) {
	elem.classList = [id].concat([...elem.classList]).join(' ')
}

export function get_tag_name(elem) {
	return elem.tagName.toLowerCase()
}

export function clone(element)
{
	const tag_name = get_id(element).split('__')[0]
	const clone = document.createElement(tag_name)
	clone.classList.add('__item')
	clone.classList.add('__droppable')
	clone.setAttribute('draggable', true)
	add_id(clone, create_unique_id())

	switch (get_tag_name(clone)) {
		case 'h1':
		case 'p':
			clone.innerHTML = 'Insert Text'
			clone.onblur = e => clone.setAttribute('contenteditable', false)
			clone.ondblclick = e => {
				clone.setAttribute('contenteditable', true)
				clone.focus()
				window.getSelection().selectAllChildren(clone)
			}
			setTimeout(() => {
				clone.setAttribute('contenteditable', true)
				clone.focus()
				window.getSelection().selectAllChildren(clone)
			}, 100)
			break;

		case 'textarea':
			clone.style.resize = 'both'
			clone.removeAttribute('disabled')
			break;
	}

	return clone
}

export function str_to_html(html_string)
{
	const temp = document.createElement('div')
	temp.innerHTML = html_string.trim()
	console.log(temp.childNodes[0])
	return temp.childNodes[0]
}
