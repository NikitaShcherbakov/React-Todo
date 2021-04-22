import {
  CREATE_ITEM,
  DELETE_ITEM,
  FILTER_BY,
  CHECKED,
  PARSER_ITEM,
} from "./Type";

const initialState = {
  items: [],
  newArr: [],
  allItemCounting: 0,
  allItemChecked: 0,
  filterBy: "All",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload),
        allItemCounting: ++state.allItemCounting,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        allItemCounting: --state.allItemCounting,
      };
    case FILTER_BY:
      return { ...state, filterBy: action.payload.filterBy };
    case CHECKED: {
      state.items.map((item) => {
        if (item.id === action.payload) {
            item.checked = !item.checked;
            if (item.checked) {
                ++state.allItemChecked;
            } else {
                --state.allItemChecked;
            }
        }
      });
      return state;
    }
    case PARSER_ITEM:
      return { ...state, newArr: action.payload };
    default:
      return state;
  }
};

export { rootReducer };