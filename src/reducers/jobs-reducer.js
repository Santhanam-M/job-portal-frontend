const initialState = {
  data: [],
  serverErrors: [],
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_JOBS": {
      return { ...state, data: action.payload };
    }

    case "ADD_JOBS": {
      return { ...state, data: [...state.data, action.payload] };
    }

    case 'EDIT_JOB' : {
      const updatedJob = state.data.map((ele)=>{
        if(ele._id === action.payload._id){
          return {...ele, ...action.payload}
        }
        else{
          return {...ele}
        }
      })
      return {...state, data : updatedJob}
    }

    case "JOB_SERVER_ERRORS": {
      return { ...state, serverErrors: action.payload };
    }
    
    case "GET_ALL_JOBS": {
      return { ...state, data: action.payload };
    }

    case "DELETE_JOB": {
      const deleteJob = state.data.filter((ele) => {
        return ele._id !== action.payload._id;
      });

      return { ...state, data: deleteJob };
    }

    default: {
      return { ...state };
    }
  }
};

export default jobsReducer;
