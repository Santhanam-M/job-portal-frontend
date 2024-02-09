import axios from "../config/axios";

export const startAddJob = ({ formData, resetForm, toast }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/createJobs", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addJob(response.data));
      resetForm();
      toast.success("Job created successfully");
    } catch (e) {
      dispatch(addJobServerError(e.response.data.errors));
    }
  };
};

export const startEditjob = ({ formData, toast, id, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/edit-myJob/${id}`, formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(editJob(response.data));
      toast.success("Job updated successfully");
      navigate('/myJobs')
    } catch (e) {
      alert(e.message);
    }
  };
};

export const startGetMyJobs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/myJobs", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getMyJobs(response.data));
    } catch (e) {
      alert(e.message);
    }
  };
};

export const startGetAllJobs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/allJobs", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(getAllJobs(response.data));
    } catch (e) {
      alert(e.message);
    }
  };
};

export const startRemoveJob = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/removeJobs/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(deleteJob(response.data));
    } catch (e) {
      alert(e.message);
    }
  };
};

const getMyJobs = (jobs) => {
  return { type: "GET_MY_JOBS", payload: jobs };
};

const getAllJobs = (data) => {
  return { type: "GET_ALL_JOBS", payload: data };
};

const addJob = (data) => {
  return { type: "ADD_JOBS", payload: data };
};

const deleteJob = (data) => {
  return { type: "DELETE_JOB", payload: data };
};

const addJobServerError = (error) => {
  return { type: "JOB_SERVER_ERRORS", payload: error };
};

const editJob = (data) => {
  return { type: "EDIT_JOB", payload: data };
};
