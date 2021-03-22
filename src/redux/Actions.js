import {CREATE_ITEM, DELETE_ITEM, FILTER_BY, CHECKED, PARSER_ITEM} from "./Type"

export const createItem = () => ({type: CREATE_ITEM});
export const deleteItem = () => ({type: DELETE_ITEM});
export const filterBy = () => ({type: FILTER_BY});
export const checked = () => ({type: CHECKED});
export const parserItem = () => ({type: PARSER_ITEM});

