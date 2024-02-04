import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { startLoginUser } from "../../actions/users-action";
import { clearUserServerErrors } from "../../actions/users-action";
import AuthFormfield from "../AuthFormFields";
import AuthButton from "../AuthButton";
import AuthLayout from "../AuthLayout";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .required("*Email is required")
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Enter a valid email address"
      ),
    password: Yup.string().required("*Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (formData, { resetForm }) => {
      dispatch(startLoginUser({ formData, resetForm, toast, navigate }));
    },
  });

  return (
    <AuthLayout>
      <h3 className="text-center pb-2 fw-bold text-auth mb-3">Login Form</h3>
      <form onSubmit={formik.handleSubmit}>
        {/* Email */}
        <AuthFormfield
          iconType="envelope"
          fieldType="email"
          fieldName="email"
          placeHolder="email"
          formik={formik}
        />

        {/* Password */}
        <AuthFormfield
          iconType="lock"
          fieldType="password"
          fieldName="password"
          placeHolder="password"
          formik={formik}
        />

        {/* Button */}
        <AuthButton value="Login" button="btn-block" />
      </form>
      <div className="mt-3 text-center">
        <p className="fw-bold">Not a Member yet? <Link to="/register">Register now</Link></p>
      </div>
    </AuthLayout>
  );
};

export default Login;
