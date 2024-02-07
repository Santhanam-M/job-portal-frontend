import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  startGetRecruiterProfile,
  startUpdateRecruiterProfile,
  startAddRecruiterProfile,
  clearUserServerErrors,
} from "../../actions/users-action";
import { useEffect, useState } from "react";
import TextInputField from "../InputComponents/TextInputField";
import RichTextEditor from "../InputComponents/RichTextEditor";
import AuthButton from "../AuthButton";

const RecruiterProfile = () => {
  const [editMode, setEditMode] = useState(true);
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const errors = useSelector((state) => state.users.serverErrors);

  //serverErrors
  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((err) => {
        toast.warning(err.msg);
      });
      // clear errors after showing them
      dispatch(clearUserServerErrors());
    }
  }, [errors]);

  // get profile when the page reloads
  useEffect(() => {
    dispatch(startGetRecruiterProfile());
  }, []);

  const userName =
    (users.data.creator ? users.data.creator.userName : "") ||
    (users.data.recruiter ? users.data.recruiter?.creator?.userName : "");

  const email =
    (users.data.creator ? users.data.creator.email : "") ||
    (users.data.recruiter ? users.data.recruiter?.creator?.email : "");

  const recruiterValidationSchema = Yup.object().shape({
    companyName: Yup.string().required("*Company Name is required"),
    contactNumber: Yup.string()
      .required("*Contact Number is required")
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Contact Number should be valid"),
    companyBio: Yup.string()
      .required("*Company Bio is required")
      .min(10, "Minimun 10 characters required"),
  });

  const formik = useFormik({
    initialValues: {
      companyName: "",
      contactNumber: "",
      companyBio: "",
    },
    validationSchema: recruiterValidationSchema,
    validateOnChange: false,
    onSubmit: (formData, { resetForm }) => {
      if (editMode) {
        dispatch(startAddRecruiterProfile({ formData, resetForm, toast }));
      } else {
        dispatch(startUpdateRecruiterProfile({ formData, resetForm, toast }));
        setEditMode(true);
      }
    },
  });

  //edit functionality

  const handleEdit = () => {
    if (editMode) {
      formik.setValues({
        companyName:
          users.data?.companyName ||
          "" ||
          users.data?.recruiter?.companyName ||
          "",
        contactNumber:
          users.data?.contactNumber ||
          "" ||
          users.data?.recruiter?.contactNumber ||
          "",
        companyBio:
          users.data?.companyBio ||
          "" ||
          users.data?.recruiter?.companyBio ||
          "",
      });
    } else {
      formik.setValues({
        companyName: "",
        contactNumber: "",
        companyBio: "",
      });
    }
    setEditMode(!editMode);
  };

  return (
    <div className="container card p-4 rounded-5">
      <h5 className="text-uppercase fw-bold text-auth">User Profile</h5>
      <hr />

      {(users.data.recruiter || users.data.creator) && (
        <div className="row">
          {/* username */}
          <div className="col-lg-6 col-md-6 form-group p-3">
            <label className="fw-bold">User Name</label>
            <input
              type="text"
              disabled
              value={userName}
              readOnly
              className="form-control"
            />
          </div>

          {/* email */}
          <div className="col-lg-6 col-md-6 form-group p-3">
            <label className="fw-bold">Email</label>
            <input
              type="text"
              disabled
              value={email}
              readOnly
              className="form-control"
            />
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        {/* Company Name */}
        <div className="row">
          <TextInputField
            label="Company Name"
            fieldType="text"
            fieldName="companyName"
            formik={formik}
          />

          {/* Contact Number */}
          <TextInputField
            label="Contact Number"
            fieldType="text"
            fieldName="contactNumber"
            formik={formik}
          />

          {/* Company Bio */}
          <RichTextEditor
            label="Company Bio"
            fieldName="companyBio"
            formik={formik}
            fieldClass="custom-recruiter"
          />

          {/* Button */}
          <div className="d-flex">
            <AuthButton value="save profile" />
            {(users.data.message || users.data.creator) && (
              <button
                type="button"
                className={`btn btn-rounded btn-sm mt-3 ms-3 button-auth`}
                onClick={handleEdit}
              >
                {editMode ? "Edit" : "Cancel"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecruiterProfile;
