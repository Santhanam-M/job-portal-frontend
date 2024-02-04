const initialState = {
  data: [],
};

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_RESUME": {
      return { ...state, data: [...state.data, action.payload] };
    }

    case "GET_RESUME": {
      return { ...state, data: action.payload };
    }

    case "DELETE_RESUME": {
      const deleteResume = state.data.filter((ele) => {
        return ele._id !== action.payload._id;
      });
      return { ...state, data: deleteResume };
    }

    default: {
      return { ...state };
    }
  }
};

export default resumeReducer;
