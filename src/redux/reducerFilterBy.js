import { FILTER_BY } from "./Type";

const initialState = {
    filterBy: "All"
  };

const reducerFilterBy = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY:
      return { ...state, filterBy: action.payload.filterBy };
    default:
      return state;
  }
};
export { reducerFilterBy };
