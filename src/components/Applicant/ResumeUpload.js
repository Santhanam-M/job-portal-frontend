import { useFormik } from "formik";
import * as Yup from "yup";
import AuthButton from "../AuthButton";
import { useEffect, useState } from "react";
import { startGetApplicantProfile } from "../../actions/users-action";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddResume,
  startGetMyResumes,
  startRemoveResume,
} from "../../actions/resume-action";

const ResumeUpload = () => {
  const dispatch = useDispatch();
  const [inputKey, setInputKey] = useState(Date.now());

  const resumeValidationSchema = Yup.object().shape({
    title: Yup.string().required("*Title is required"),
    file: Yup.mixed().required("File is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      file: "",
    },
    validationSchema: resumeValidationSchema,
    validateOnChange: false,
    onSubmit: (data, { resetForm }) => {
      console.log(data);
      dispatch(startAddResume({ data, resetForm, setInputKey }));
    },
  });

  // get className
  const getClassName = (field) => {
    if (
      !formik.errors[field] &&
      formik.touched[field] &&
      formik.values[field]
    ) {
      return "is-valid";
    } else if (formik.errors[field]) {
      return "is-invalid";
    }
  };

  //get resume when the page reloads
  useEffect(() => {
    dispatch(startGetMyResumes());
  }, []);

  //get profile when the page reloads
  useEffect(() => {
    dispatch(startGetApplicantProfile());
  }, []);

  const resumes = useSelector((state) => {
    return state.resume;
  });

  //update the file
  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  };

  //delete the resume
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(startRemoveResume(id));
    }
  };

  return (
    <div className="container card p-4">
      <h5 className="text-uppercase fw-bold text-auth">Resume</h5>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6 col-md-6 form-group p-3">
            <label className="fw-bold">Enter Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              className={`${getClassName("title")} form-control`}
            />
            {formik.errors.title && (
              <div className="invalid-feedback">{formik.errors.title}</div>
            )}
          </div>

          <div className="col-lg-6 col-md-6 form-group p-3">
            <label className="fw-bold">Add Resume</label>
            <input
              key={inputKey}
              type="file"
              name="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className={`${getClassName("file")} form-control`}
            />
            {formik.errors.file && (
              <div className="invalid-feedback">{formik.errors.file}</div>
            )}
          </div>
        </div>
        <AuthButton value="Add resume" />
      </form>

      {/* Displaying Table */}
      {resumes.data.length > 0 && (
        <div className="container mt-4 table-responsive-sm">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Title</th>
                <th>Created At</th>
                <th>Download Resume</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {resumes.data.map((ele, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele._id}</td>
                    <td>{ele.title}</td>
                    <td>{new Date(ele.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </td>
                    <td><a href={ele.resume}>Click here to Download</a></td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-rounded"
                        onClick={() => {
                          handleDelete(ele._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
