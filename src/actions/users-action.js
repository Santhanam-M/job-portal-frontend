import { toast } from "react-toastify";
import axios from "../config/axios";

//Register
export const startRegisterUser = ({ formData, resetForm, toast, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/users/register", formData);
      resetForm();
      navigate("/login");
      toast.success("Registration successful!");
    } catch (e) {
      dispatch(addUserServerErrors(e.response.data.errors));
      toast.error("Registration failed!");
    }
  };
};

//Login and token generation
export const startLoginUser = ({ formData, resetForm, toast, navigate }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/users/login", formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.userRole);
      resetForm();
      navigate("/myProfile");
      toast.success("Logged-in successfull!");
      dispatch(getRole(response.data.userRole));
    } catch (e) {
      dispatch(addUserServerErrors(e.response.data.errors));
      toast.error("Login failed!");
    }
  };
};

//recruiter profile adding
export const startAddRecruiterProfile = ({ formData, resetForm, toast }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/api/recruiter/createProfile",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      dispatch(addUser(response.data));
      resetForm();
      toast.success("Profile updated successfully");
    } catch (e) {
      dispatch(addUserServerErrors(e.response.data.errors));
    }
  };
};

//recruiter profile getting
export const startGetRecruiterProfile = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/recruiter/myProfile", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addUser(response.data));
    } catch (e) {
      toast.warning("Update your profile to unlock more features!");
    }
  };
};

//applicant profile adding
export const startAddApplicantProfile = ({ formData, resetForm, toast }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("api/applicant/createProfile", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(addUser(response.data));
      resetForm()
      toast.success("Profile updated successfully");
    } catch (e) {
      dispatch(addUserServerErrors(e.response.data.errors));
    }
  };
};

//applicant profile getting
export const startGetApplicantProfile = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/applicant/myProfile', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      dispatch(addUser(response.data))
    }
    catch (e) {
      toast.warning("Update your profile to unlock more features!");
    }
  }
}

const addUser = (data) => {
  return { type: "ADD_USER", payload: data };
};

export const getRole = (role) => {
  return { type: "GET_ROLE", payload: role };
};

const addUserServerErrors = (error) => {
  return { type: "USER_SERVER_ERRORS", payload: error };
};

export const clearUserServerErrors = () => {
  return { type: "CLEAR_SERVER_ERRORS" };
};

export const removeUser = () => {
  return { type: "LOGOUT_USER" };
};
