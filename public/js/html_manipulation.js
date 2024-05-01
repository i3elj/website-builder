import * as ctx from "./context-menu.js";
import * as editors from "./editors.js";

export function create_unique_id()
{
    const id_list = Array.from(htmx.findAll('.__item'))
                         .map(e => e.dataset.id.split('-')[1])

    if (id_list.length == 0)
        return '__item-1'

    return '__item-' + (Math.max(...id_list) + 1)
}

export function get_tag_name(elem) {
    return elem.tagName.toLowerCase()
}

export function clone(element)
{
    const tag_name = element.dataset.id.split('__')[0]
    const clone = document.createElement(tag_name)
    clone.classList.add('__item')
    clone.classList.add('__spacer')
    clone.classList.add('__droppable')
    clone.setAttribute('draggable', true)
    clone.dataset.id = create_unique_id()

    switch (get_tag_name(clone)) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'p':
        case 'a':
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
    return temp.childNodes[0]
}

export function deleteElement(id) {
    htmx.find(`[data-id="${id}"]`).remove()
    ctx.deactivate_menu()
}

export function editHtml(id) {
    const element = htmx.find(`[data-id="${id}"`)
    editors.html(element)
    ctx.deactivate_menu()
}

export function editStyles(id) {
    const element = htmx.find(`[data-id="${id}"`)
    editors.css(element)
    ctx.deactivate_menu()
}

export function addClass(element) {
    const wrapper = htmx.find('#__add-class-wrapper')
    wrapper.style.display = 'flex'
    wrapper.onmousedown = function(e) {
        if (element == this) wrapper.style.display = 'none'
    }

    const form = htmx.find('#__add-class-wrapper form')
    form.onsubmit = (e) => {
        e.preventDefault()

        const className = htmx.find('#__add-class-wrapper form input').value
        if (!element.classList.contains(className)) {
            element.classList.add(className)

            if (htmx.find(`style.${className}`) == null) {
                const customStyleTag = document.createElement('style')
                customStyleTag.classList.add(className)
                document.body.prepend(customStyleTag)
            }
        }

        if (htmx.find(`button[data-id='${className}']`) == null) {
            const div = document.createElement('div')
            const editBtn = document.createElement('button')
            editBtn.classList.add('__class-btn')
            editBtn.dataset.id = className
            editBtn.textContent = '.' + className
            editBtn.onclick = (event) => {
                editors.cssClass(
                    htmx.find('style' + element.textContent),
                    `.${className}`
                )
            }
            const deleteBtn = document.createElement('button')
            const deleteIcon = document.createElement('img')
            deleteIcon.src = '/public/assets/delete-icon.svg'
            deleteBtn.appendChild(deleteIcon)
            deleteBtn.onclick = (event) => {
                Array.from(htmx.findAll(`.${className}`))
                     .map(e => e.classList.remove(className));
                div.remove()
            }

            div.appendChild(editBtn)
            div.appendChild(deleteBtn)
            htmx.find('#__class-list').prepend(div)
        }

        ctx.deactivate_menu()
        wrapper.style.display = 'none'
    }

    const input = htmx.find('#__add-class-wrapper input')
    input.focus()

    ctx.deactivate_menu()
}
