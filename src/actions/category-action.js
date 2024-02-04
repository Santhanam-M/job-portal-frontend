import { toast } from "react-toastify";
import axios from "../config/axios";

export const startGetCategory = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/categories");
      dispatch(getCategory(response.data));
    } catch (e) {
      alert(e.message);
    }
  };
};

export const startAddCategory = (form) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/api/categories", form, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      dispatch(addCategory(response.data));
      dispatch(clearServerErrors())
    } catch (e) {
      dispatch(categoryServerErrors(e.response.data.errors));
    }
  };
};

const getCategory = (data) => {
  return { type: "GET_CATEGORY", payload: data };
};

const addCategory = (data) => {
  return { type: "ADD_CATEGORY", payload: data };
};

const categoryServerErrors = (error) => {
  return { type: "CATEGORY_SERVER_ERRORS", payload : error};
};

export const clearServerErrors = () => {
  return { type: "CLEAR_SERVER_ERRORS" };
};
