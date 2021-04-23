import { PARSER_ITEM } from "./Type";

const initialState = {
    newArr: []
  };

const reducerParserItem = (state = initialState, action) => {
  switch (action.type) {
    case PARSER_ITEM:
      return { ...state, newArr: action.payload };
    default:
      return state;
  }
};
export { reducerParserItem };