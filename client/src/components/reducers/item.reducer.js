const initialState = {
  items: null,
  status: "loading",
};

export default function itemReducer(state = initialState, action) {
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
  console.log(typeof state.items.items);
  return state.items.items;
};
