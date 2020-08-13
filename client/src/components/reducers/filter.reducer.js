const initialState = {
  category: "All",
  bodyLocation: "All",
  company: 0,
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_CATEGORY": {
      return { ...state, category: action.category };
    }
    case "UPDATE_BODYLOCATION": {
      return { ...state, bodyLocation: action.bodyLocation };
    }
    case "UPDATE_COMPANY": {
      return { ...state, company: action.company };
    }
    default: {
      return state;
    }
  }
}

export const getFilterCategory = (state) => {
  return state.filter.category;
};

export const getFilterbodyLocation = (state) => {
  return state.filter.bodyLocation;
};

export const getFilterCompany = (state) => {
  return state.filter.company;
};
