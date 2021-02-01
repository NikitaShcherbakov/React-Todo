import {CREATE_ITEM, DELETE_ITEM, FILTER_BY, CHECKED, PARSER_ITEM} from "./Type"

export const createItem = () => {
    return {
        type: CREATE_ITEM
    }
}
export const deleteItem = () => {
    return {
        type: DELETE_ITEM
    }
}
export const filterBy = () => {
    return {
        type: FILTER_BY
    }
}
export const Checked = () => {
    return {
        type: CHECKED
    }
}
export const ParserItem = () => {
    return {
        type: PARSER_ITEM
    }
}

