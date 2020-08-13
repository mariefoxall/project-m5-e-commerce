const initialState = {
  status: "hidden",
  cartContent: {},
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        ...state,
        status: "visible",
        cartContent: {
          ...state.cartContent,
          [action.item.id]: {
            ...action.item,
            quantity: state.cartContent[action.item.id]
              ? state.cartContent[action.item.id].quantity + 1
              : 1,
          },
        },
      };
    }
    case "REMOVE_ITEM": {
      const stateCopy = { ...state }; // New object we CAN mutate
      delete stateCopy.cartContent[action.item.id];
      return stateCopy;
    }
    case "UPDATE_QUANTITY": {
      console.log(action);
      return {
        ...state,
        cartContent: {
          [action.item.id]: {
            ...state.cartContent[action.item.id],
            quantity: action.item.quantity,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}

export const getCartItemArray = (state) => {
  console.log(Object.values(state.cart.cartContent));
  return Object.values(state.cart.cartContent);
};

export const getCartItemQuantity = (state, id) => {
  return state.cart.cartContent.id.quantity;
};
