import { useFormik } from "formik";
import * as Yup from "yup";
import TextInputField from "../InputComponents/TextInputField";
import SelectMenu from "../InputComponents/SelectMenu";
import AuthButton from "../AuthButton";
import { useDispatch, useSelector } from "react-redux";
import {
  startAddApplicantProfile,
  startGetApplicantProfile,
  clearUserServerErrors,
} from "../../actions/users-action";
import { toast } from "react-toastify";
import { useEffect } from "react";

const ApplicantProfile = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);
  const errors = useSelector((state) => state.users.serverErrors);

  //serverErrors
  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((err) => {
        toast.warn(err.msg);
      });
      // clear errors after showing them
      dispatch(clearUserServerErrors());
    }
  }, [errors]);

  const applicantValidationSchema = Yup.object().shape({
    aboutMe: Yup.string().required("*AboutMe is required"),
    contactNumber: Yup.string()
      .required("*Contact Number is required")
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Contact Number should be valid"),
    experience: Yup.string().required("*Expereince is required"),
    location: Yup.string().required("*Location is required"),
  });

  const formik = useFormik({
    initialValues: {
      aboutMe: "",
      contactNumber: "",
      location: "",
      experience: "",
    },
    validationSchema: applicantValidationSchema,
    validateOnChange: false,
    onSubmit: (formData, { resetForm }) => {
      dispatch(startAddApplicantProfile({ formData, resetForm, toast }));
    },
  });

  //select experience
  const selectExperience = [
    { value: "fresher", label: "Fresher" },
    { value: "experience", label: "Experience" },
  ];

  //get profile when the page reloads
  useEffect(() => {
    dispatch(startGetApplicantProfile());
  }, []);

  const userName =
    (users.data.creator ? users.data.creator.userName : "") ||
    (users.data.applicant ? users.data.applicant.userName : "");

  const email =
    (users.data.creator ? users.data.creator.email : "") ||
    (users.data.applicant ? users.data.applicant.email : "");

  return (
    <div className="container card p-4 rounded-5">
      <h5 className="text-uppercase fw-bold text-auth">User Profile</h5>
      <hr />

      {(users.data.applicant || users.data.creator) && (
        <div className="row">
          {/* User Name */}
          <div className="col-lg-6 col-md-6 form-group">
            <label className="fw-bold">User Name</label>
            <input
              type="text"
              value={userName}
              readOnly
              disabled
              className="form-control"
            />
          </div>

          {/* Email */}
          <div className="col-lg-6 col-md-6 form-group">
            <label className="fw-bold">Email</label>
            <input
              type="text"
              value={email}
              readOnly
              disabled
              className="form-control"
            />
          </div>
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {/* About Me */}
          <TextInputField
            label="About Me"
            fieldType="text"
            fieldName="aboutMe"
            formik={formik}
          />

          {/* contactNumber */}
          <TextInputField
            label="Contact Number"
            fieldType="text"
            fieldName="contactNumber"
            formik={formik}
          />

          {/* Location */}
          <TextInputField
            label="Location"
            fieldType="text"
            fieldName="location"
            formik={formik}
          />

          {/* Experience */}
          <SelectMenu
            label="Select Experience"
            options={selectExperience}
            fieldName="experience"
            formik={formik}
          />

          {/* button */}
          <AuthButton value="save profile" />
        </div>
      </form>
    </div>
  );
};

export default ApplicantProfile;
