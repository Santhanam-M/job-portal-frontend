import axios from "../config/axios";

export const startAddResume = ({ data, resetForm, setInputKey }) => {
    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("file", data.file);

            const response = await axios.post("/api/addResume", formData, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            dispatch(addResume(response.data));
            resetForm();
            setInputKey(Date.now())
        } catch (e) {
            console.log(e.response.data);
        }
    };
};

export const startGetMyResumes = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/api/viewMyResume", {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            dispatch(getResume(response.data));
        } catch (e) {
            alert(e.message);
        }
    };
};

export const startRemoveResume = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/api/removeResume/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            dispatch(deleteResume(response.data));
            console.log(response.data)
        } catch (e) {
            alert(e.message);
        }
    };
};

const addResume = (data) => {
    return { type: "ADD_RESUME", payload: data };
};

const getResume = (data) => {
    return { type: "GET_RESUME", payload: data };
};

const deleteResume = (data) => {
    return { type: "DELETE_RESUME", payload: data };
};
