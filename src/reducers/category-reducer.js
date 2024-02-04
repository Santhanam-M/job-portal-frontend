const initialValues = {
  data: [],
  serverErrors : []
};

const categoryReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "ADD_CATEGORY": {
      return { ...state, data: [...state.data, action.payload] };
    }
    case "GET_CATEGORY": {
      return { ...state, data: action.payload };
    }
    case "CATEGORY_SERVER_ERRORS" : {
      return {...state, serverErrors : action.payload}
    }
    case "CLEAR_SERVER_ERRORS": {
      return { ...state, serverErrors: [] };
    }
    default: {
      return { ...state };
    }
  }
};

export default categoryReducer;
