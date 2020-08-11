const initialState = {
  items: null,
  status: "loading",
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_ITEMS": {
      return { ...state, items: action.items, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getStoreItems = (state) => {
  return state.items;
};
