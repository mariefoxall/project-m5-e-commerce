const initialState = {
  items: null,
  status: "loading",
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    // case "REQUEST_ITEMS": {
    //   return { ...state, status: "loading" };
    // }
    case "RECEIVE_ITEMS": {
      return { ...state, items: action.items, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getStoreItemArray = (state) => {
  return state.items.items;
};
