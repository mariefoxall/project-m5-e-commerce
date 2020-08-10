const initialState = {
  company: null,
  status: "loading",
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_COMPANY": {
      return { ...state, company: action.company, status: "idle" };
    }
    default: {
      return state;
    }
  }
}

export const getCompany = (state) => {
  return state.company;
};
