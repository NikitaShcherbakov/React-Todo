import {CREATE_ITEM, DELETE_ITEM, FILTER_BY, CHECKED, PARSER_ITEM} from "./Type"

const initialState = {
    items: [],
    newArr: [],
    filterBy: 'All'
}

const rootReducer = (state = initialState, action) => {
    // debugger;
    switch (action.type) {
        case CREATE_ITEM: return {...state, items: state.items.concat(action.payload)};
        case DELETE_ITEM: return {...state, items: state.items.filter(item => item.id !== action.id)};
        case FILTER_BY: return {...state, filterBy: action.payload.filterBy};
        case CHECKED:  {state.items.map((item) => {if(item.id === action.id) {item.checked = !item.checked}}); return state};
        case PARSER_ITEM:  return {...state, newArr: action.payload};
        default : return state
    }
}

export {rootReducer}