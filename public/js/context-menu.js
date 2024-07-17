const contextMenu = {
    container: element('#__ctx-menu-wrapper'),
    menu: element('#__ctx-menu'),
    title: element('#__ctx-menu-title'),
    classMenu : {
        container: element('#__ctx-menu > details'),
        list: element('#__ctx-menu > details > div')
    }
}

contextMenu.container.onmousedown = function(e) {
    if (e.target == this) deactivateMenu()
}

function activateMenu(event) {
    contextMenu.container.style.display = 'flex'
    contextMenu.title.textContent = html_getTagName(event.target).concat(
        ' ', Array.from(event.target.classList)
                  .filter(c => !c.startsWith('__'))
                  .map(c => '.'.concat(c))
                  .join(' ')
    );

    const [
        btnDelete,
        btnHtml,
        btnStyles,
        btnAddClass,
    ] = Array.from(contextMenu.menu.children)
             .filter(e => e.tagName.toLowerCase() == 'button')

    const id = event.target.dataset.id
    btnDelete.onclick   = () => html_deleteElement(id)
    btnHtml.onclick     = () => html_editHtml(id)
    btnStyles.onclick   = () => html_editStyles(id)
    btnAddClass.onclick = () => html_addClass(event.target, contextMenu)
}

function deactivateMenu() {
    contextMenu.container.style.display = 'none'
}

function openContextMenu(event) {
    event.preventDefault()
    activateMenu(event)

    const m_width = contextMenu.menu.offsetWidth
    const m_height = contextMenu.menu.offsetHeight

    var left = event.pageX + m_width >= window.innerWidth
             ? event.pageX - m_width
             : event.pageX

    var top = event.pageY + m_height >= window.innerHeight
            ? event.pageY - m_height
            : event.pageY

    contextMenu.menu.style.left = `${left}px`
    contextMenu.menu.style.top = `${top}px`
}
