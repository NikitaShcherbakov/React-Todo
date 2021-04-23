import { CREATE_ITEM } from "./Type";

const initialState = {
    items: [],
    allItemCounting: 0
};

const reducerCreateItem = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return {
        ...state,
        items: state.items.concat(action.payload),
        allItemCounting: ++state.allItemCounting,
      };
      default: {
        return state;
    }
  }
};
export { reducerCreateItem };
