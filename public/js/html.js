function createUniqueId() {
    const idList = Array
        .from(elements('.__item'))
        .map(e => e.dataset.id.split('-')[1])

    if (idList.length == 0)
        return '__item-1'

    return '__item-' + (Math.max(...idList) + 1)
}

function html_getTagName(elem) {
    return elem.tagName.toLowerCase()
}

function html_clone(element) {
    const tag_name = element.dataset.id.split('__')[0]
    const clone = tag.element({
        name: tag_name,
        classes: '__item __spacer __droppable',
        dataset: { id: createUniqueId() },
        props: [{ name: 'draggable', value: true }]
    })

    switch (html_getTagName(clone)) {
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

function html_strToHtml(html_string) {
    const temp = document.createElement('div')
    temp.innerHTML = html_string.trim()
    return temp.childNodes[0]
}

function html_deleteElement(id) {
    element(`[data-id="${id}"]`).remove()
    ctx.deactivate_menu()
}

function html_editHtml(id) {
    const element = element(`[data-id="${id}"`)
    editors.html(element)
    ctx.deactivate_menu()
}

function html_editStyles(id) {
    const element = element(`[data-id="${id}"`)
    editors.css(element)
    ctx.deactivate_menu()
}

function html_addClass(element, contextMenu) {
    const wrapper = element('#__add-class-wrapper')
    wrapper.style.display = 'flex'
    wrapper.onmousedown = function(e) {
        if (element == this) wrapper.style.display = 'none'
    }

    const form = element('#__add-class-wrapper form')
    form.onsubmit = (e) => {
        e.preventDefault()

        const className = element('#__add-class-wrapper form input').value
        if (!element.classList.contains(className)) {
            element.classList.add(className)

            const ctxMenuClassBtn = tag.div({
                classes: '__ctx-menu-classes-btns',
                children: [
                    tag.p({text: `.${className}`}),
                    tag.button({
                        classes: '__ctx-menu-button',
                        children: tag.img({src: '/public/assets/delete-icon.svg'}),
                        onclick: (e) => {
                            element.classList.remove(className)
                            ctxMenuClassBtn.remove()
                        }
                    })
                ]
            })
            contextMenu.classMenu.list.appendChild(ctxMenuClassBtn)

            if (element(`style.${className}`) == null) {
                const customStyleTag = tag.style({classes: className})
                document.body.prepend(customStyleTag)
            }
        }

        if (element(`button[data-id='${className}']`) == null) {
            const div = tag.div({
                children: [
                    tag.button({
                        dataset: {id: className},
                        classes: '__class-btn',
                        text: `.${className}`,
                        onclick: (event) => editors.cssClass(element(`style.${className}`), `.${className}`)
                    }),
                    tag.button({
                        onclick: (event) => {
                            Array.from(elements(`style.${className}`)).forEach(e => e.remove());
                            Array.from(elements(`.${className}`)).map(e => e.classList.remove(className));
                            div.remove();
                        },
                        children: tag.img({src: '/public/assets/delete-icon.svg'})
                    })
                ]
            })

            element('#__class-list').prepend(div);
        }

        deactivateMenu()
        wrapper.style.display = 'none'
    }

    const input = element('#__add-class-wrapper input')
    input.focus()

    deactivateMenu()
}
