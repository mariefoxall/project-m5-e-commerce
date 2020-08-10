const initialState = {
  companies: null,
  status: "loading",
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_COMPANIES": {
      return { ...state, companies: action.companies, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getCompanies = (state) => {
  return state.companies;
};
