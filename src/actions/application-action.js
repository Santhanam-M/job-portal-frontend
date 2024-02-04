import axios from "../config/axios";

export const startApplyjob = (jobId, resumeId) => {
  console.log(jobId, resumeId);
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/application/${jobId}`,
        { resume: resumeId },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch(addApplication(response.data));
    } catch (e) {
      alert(e.message);
      console.log(e.response.data);
    }
  };
};

export const startGetApplications = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/myApplication", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getApplication(response.data));
    } catch (e) {
      alert(e.message);
    }
  };
};

export const startGetRecruiterApplication = (jobId) =>{
  return async (dispatch)=>{
    try{
      const response = await axios.get(`/api/recruiter/myApplication/${jobId}`, {
        headers : {
          Authorization : localStorage.getItem('token')
        }
      })
      dispatch(getApplication(response.data))
    }
    catch(e){
      alert(e.message)
    }
  }
}

export const StartChangeApplicationStatus = (applicationId, status) =>{
  console.log(applicationId, status)
  return async(dispatch)=>{
    try{
      const response = await axios.put(`/api/updateStatus/${applicationId}`, status, {
        headers : {
          Authorization : localStorage.getItem('token')
        }
      })
      console.log(response.data)
      dispatch(changeStatus(response.data))
    }
    catch(e){
      alert(e.message)
      console.log(e.response.data.errors)
    }
  }
}

const addApplication = (data) => {
  return { type: "ADD_APPLICATION", payload: data };
};

const getApplication = (data) => {
  return { type: "GET_APPLICATION", payload: data };
};

const changeStatus  = (data)=>{
  return {type : 'CHANGE_STATUS', payload : data}
}
