import{CREATE_ITEM, DELETE_ITEM, FILTER_BY, CHECKED, PARSER_ITEM} from "./Type"

export const createItem = (newItem) => {
    return {
        type: CREATE_ITEM,
        payload: newItem
    }
}
export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}
export const filterBy = (selectedItem) => {
    return {
        type: FILTER_BY,
        payload: selectedItem
    }
}
export const Checked = (id) => {
    return {
        type: CHECKED,
        payload: id
    }
}
export const ParserItem = (newArr) => {
    return {
        type: PARSER_ITEM,
        payload: newArr
    }
}

