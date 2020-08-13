const initialState = {
  status: "idle",
  error: null,
  selectedItems: [],
  totalPrice: null,
  orderConfirmed: null,
};

export default function purchaseReducer(state = initialState, action) {
  switch (action.type) {
    case "BEGIN-PURCHASE-PROCESS": {
      return {
        ...state,
        status: "begin-purchase",
        selectedItems: action.data.cartItems,
        totalPrice: action.data.total,
      };
    }
    case "CANCEL-PURCHASE-PROCESS": {
      return initialState;
    }
    case "PURCHASE-ITEMS-FAILURE": {
      return {
        ...state,
        status: "error",
        error: action.err,
        selectedItems: action.data.cartItems,
        totalPrice: action.data.total,
      };
    }
    case "PURCHASE-ITEMS-SUCCESS": {
      return {
        ...state,
        status: "purchased",
        error: null,
        selectedItems: null,
        totalPrice: null,
        orderConfirmed: action.data,
      };
    }
    case "NUM-IN-STOCK-UPDATE-SUCCESS": {
      return {
        ...state,
        status: "waiting-to-confirm-order",
      };
    }
    default: {
      return state;
    }
  }
}

export const getOrderConfirmed = (state) => {
  return state.purchase.orderConfirmed;
};
