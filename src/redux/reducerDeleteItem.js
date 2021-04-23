import { DELETE_ITEM } from "./Type";

const initialState = {
    items: [],
    allItemCounting: 0
};

const reducerDeleteItem = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ITEM:
      debugger
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        allItemCounting: --state.allItemCounting,
      };
    default:
      return state;
  }
};
export { reducerDeleteItem };
