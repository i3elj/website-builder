export function create_unique_id()
{
    const id_list = Array.from(htmx.findAll('.__item'))
                         .map(e => get_id(e).split('-')[1])

    console.log(id_list)

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
