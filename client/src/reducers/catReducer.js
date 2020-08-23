import {
  GET_CAT,
  GET_ALL_CATS,
  UPDATE_CAT,
  CREATE_CAT,
  GET_CAT_ID,
} from "../actions/types";

const initialState = {
  catId: "",
  allCats: [],
  specificCat: {
    name: "Zazzles",
    nickName: "Zazzy",
    clicks: 7,
    image: "https://source.unsplash.com/IbPxGLgJiMI/640x960",
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATS:
      return {
        ...state,
        allCats: action.payload,
      };
    case GET_CAT:
      return Object.assign({}, state, {
        specificCat: action.payload,
      });
    case CREATE_CAT:
      return {
        ...state,
        allCats: [action.payload, ...state.allCats],
      };
    case UPDATE_CAT:
      return Object.assign({}, state, {
        specificCat: action.payload,
      });
    case GET_CAT_ID:
      return {
        ...state,
        catId: action.payload,
      };
    default:
      return state;
  }
}
