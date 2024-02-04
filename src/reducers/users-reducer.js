const initialState = {
  data: {},
  serverErrors: [],
  role: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SERVER_ERRORS": {
      return { ...state, serverErrors: action.payload };
    }

    case "GET_ROLE": {
      return { ...state, role: action.payload };
    }

    case "CLEAR_SERVER_ERRORS": {
      return { ...state, serverErrors: [] };
    }

    case "ADD_USER": {
      return { ...state, data: action.payload };
    }

    case "LOGOUT_USER": {
      return { ...state, data: {} };
    }

    default: {
      return { ...state };
    }
  }
};

export default usersReducer;
