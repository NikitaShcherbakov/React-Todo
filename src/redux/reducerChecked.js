import { CHECKED, } from "./Type";

const initialState = {
    items: [],
    allItemChecked: 0
};

const reducerChecked = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
export { reducerChecked };
