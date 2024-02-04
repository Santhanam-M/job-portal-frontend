import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { startRegisterUser } from "../../actions/users-action";
import { clearUserServerErrors } from "../../actions/users-action";
import AuthFormfield from "../AuthFormFields";
import AuthFormRadio from "../AuthFormRadio";
import AuthButton from "../AuthButton";
import AuthLayout from "../AuthLayout";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const errors = useSelector((state) => state.users.serverErrors);

  //serverErrors
  useEffect(() => {
    if (errors && errors.length > 0) {
      errors.forEach((err) => {
        toast.warning(err.msg);
      });
      // clear errors after showing them
      dispatch(clearUserServerErrors());
    }
  }, [errors]);

  const registerValidateSchema = Yup.object().shape({
    userName: Yup.string().required("*Username is required").min(4),
    email: Yup.string()
      .required("*E-Mail is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Enter a valid email address"
      ),
    password: Yup.string()
      .required("*Password is required")
      .min(8, "Password must have at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .matches(/[0-9]/, "Password must contain at least 1 number")
      .matches(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      )
      .max(12, "Password must not be greater than 12 characters"),
    confirmPassword: Yup.string()
      .required("*Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    role: Yup.string().required("*Please select your role"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    },
    validationSchema: registerValidateSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (formData, { resetForm }) => {
      dispatch(startRegisterUser({ formData, resetForm, toast, navigate }));
    },
  });

  return (
          <AuthLayout>
          <h3 className="text-center fw-bold pb-2 text-auth mb-3">
            Registration Form
          </h3>
          <form onSubmit={formik.handleSubmit}>
            {/* username */}
            <AuthFormfield
              iconType="user"
              fieldType="text"
              fieldName="userName"
              placeHolder="UserName"
              formik={formik}
            />

            {/* email */}
            <AuthFormfield
              iconType="envelope"
              fieldType="text"
              fieldName="email"
              placeHolder="email"
              formik={formik}
            />

            {/* password */}
            <AuthFormfield
              iconType="lock"
              fieldType="password"
              fieldName="password"
              placeHolder="password"
              formik={formik}
            />

            {/* confirmpasssword */}
            <AuthFormfield
              iconType="key"
              fieldType="password"
              fieldName="confirmPassword"
              placeHolder="confirmPassword"
              formik={formik}
            />

            {/* role */}
            <h6 className="mb-3 fw-bold">I am registering as a</h6>
            <div className="d-flex">
              <div className="me-3">
                <AuthFormRadio
                  fieldName="role"
                  fieldValue="recruiter"
                  label="Recruiter"
                  formik={formik}
                  isLast={true}
                />
              </div>

              <div>
                <AuthFormRadio
                  fieldName="role"
                  fieldValue="applicant"
                  label="Applicant"
                  formik={formik}
                  isLast={false}
                />
              </div>
            </div>

            {/* Button */}
            <AuthButton value="Register" button="btn-block" />
          </form>
          </AuthLayout>
  );
};

export default Register;
