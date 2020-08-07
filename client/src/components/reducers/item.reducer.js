const initialState = {
  items: null,
  status: "idle",
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ITEMS": {
      return { ...state, status: "loading" };
    }
    case "RECEIVE_ITEMS": {
      return { ...state, items: action.items, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getItems = (state) => {
  console.log(state);
};
