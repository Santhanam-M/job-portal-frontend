import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearServerErrors,
  startGetCategory,
} from "../../actions/category-action";
import { startAddCategory } from "../../actions/category-action";
import {
  startAddJob,
  startGetMyJobs,
  startEditjob,
} from "../../actions/jobs-action";
import { startGetRecruiterProfile } from "../../actions/users-action";
import AuthButton from "../AuthButton";
import { toast } from "react-toastify";
import CustomizableSelect from "../InputComponents/CustomizableSelect";
import TextInputField from "../InputComponents/TextInputField";
import RichTextEditor from "../InputComponents/RichTextEditor";
import SelectMenu from "../InputComponents/SelectMenu";
import { useParams, useNavigate } from "react-router-dom";

const PostJob = () => {
  const [categoryName, setCategoryName] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  // fetching categories from state
  const categories = useSelector((state) => state.category);
  const jobs = useSelector((state) => state.jobs);

  //find my job and changing the date format
  const findJob = jobs.data.find((ele) => {
    return ele._id === id;
  });

  if (findJob) {
    findJob.dateOfPosting = new Date(findJob.dateOfPosting)
      .toISOString()
      .split("T")[0];
    findJob.deadline = new Date(findJob.deadline).toISOString().split("T")[0];
  }

  //display edit job when the page reload
  useEffect(() => {
    if (findJob) {
      formik.setValues(findJob);
    }
  }, [findJob]);

  //date genration
  const today = new Date();
  const year = today.getFullYear(),
    month = String(today.getMonth() + 1).padStart(2, "0"),
    date = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${date}`;

  const jobValidationSchema = Yup.object().shape({
    title: Yup.string().required("*Title is required"),
    skills: Yup.array().min(1, "*Skill is required"),
    salary: Yup.string().required("*Salary is required"),
    jobType: Yup.string().required("*Job Type is required"),
    location: Yup.string().required("*Location is required"),
    experience: Yup.string().required("*Experience is required"),
    dateOfPosting: Yup.date()
      .required("Date of Posting is required")
      .min(formattedDate, "Date of Posting cannot be in the past")
      .max(new Date(), "Date of Posting cannot be in the future"),
    deadline: Yup.date()
      .required("*Deadline is required")
      .when("dateOfPosting", (dateOfPosting, schema) => {
        return (
          dateOfPosting &&
          schema.min(
            dateOfPosting,
            "Deadline cannot be before the Date of Posting"
          )
        );
      }),
    category: Yup.string().required("*Category name is required"),
    description: Yup.string().required("*Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: findJob ? findJob.title : "", // Prefilling title if findJob exists
      skills: findJob ? findJob.skills : [],
      description: findJob ? findJob.description : "",
      salary: findJob ? findJob.salary : "",
      jobType: findJob ? findJob.jobType : "",
      location: findJob ? findJob.location : "",
      experience: findJob ? findJob.experience : "",
      dateOfPosting: findJob ? findJob.dateOfPosting : formattedDate,
      deadline: findJob ? findJob.deadline : formattedDate,
      category: findJob ? findJob.category : "",
    },
    validationSchema: jobValidationSchema,
    validateOnChange: false,
    onSubmit: (formData, { resetForm }) => {
      if (!findJob) {
        dispatch(startAddJob({ formData, resetForm, toast }));
      } else {
        dispatch(startEditjob({ formData, toast, id, navigate }));
      }
    },
  });

  // get categories when the page reloads
  useEffect(() => {
    dispatch(startGetCategory());
  }, []);

  // get profile when the page reloads
  useEffect(() => {
    dispatch(startGetRecruiterProfile());
  }, []);

  //get  myJobs
  useEffect(() => {
    dispatch(startGetMyJobs());
  }, []);

  // converting categories into react-select format
  const transformedCategories =
    categories.data.length > 0
      ? categories.data.map((ele) => {
          return { value: ele._id, label: ele.categoryName };
        })
      : [];

  //select experience
  const selectExperience = [
    { value: "fresher", label: "Fresher" },
    { value: "experience", label: "Experience" },
  ];

  //select jobType
  const selectJobType = [
    { value: "full time", label: "full time" },
    { value: "part time", label: "part time" },
    { value: "work from home", label: "work from home" },
  ];

  //adding new category
  const handleAddCategory = () => {
    const form = {
      categoryName,
    };
    dispatch(startAddCategory(form));
    setCategoryName("");
    dispatch(clearServerErrors());
  };

  return (
    <div className="card p-4 rounded-5">
      <h5 className="text-uppercase fw-bold text-auth">Post A Job</h5>
      <hr />

      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {/* title */}
          <TextInputField
            label="Enter Title"
            fieldName="title"
            fieldType="text"
            formik={formik}
            fieldClass="p-2"
          />

          {/* skills */}
          <CustomizableSelect
            label="Skills Required"
            options={[]}
            placeHolder="Add your skills and press enter"
            fieldName="skills"
            formik={formik}
          />

          {/* salary*/}
          <TextInputField
            label="Salary"
            fieldType="text"
            fieldName="salary"
            formik={formik}
            fieldClass="p-2"
          />

          {/* jobType */}
          <SelectMenu
            label="Choose Job type"
            options={selectJobType}
            fieldName="jobType"
            formik={formik}
            fieldClass="p-1"
          />

          {/* location */}
          <TextInputField
            label="Location"
            fieldType="text"
            fieldName="location"
            formik={formik}
            fieldClass="p-2"
          />

          {/* experience */}
          <SelectMenu
            label="Select Experience"
            options={selectExperience}
            fieldName="experience"
            formik={formik}
            fieldClass="p-1"
          />

          {/* date of posting */}
          <TextInputField
            label="Date of Posting"
            fieldType="date"
            fieldName="dateOfPosting"
            formik={formik}
            fieldClass="p-2"
          />

          {/* deadline */}
          <TextInputField
            label="Deadline"
            fieldName="deadline"
            fieldType="date"
            formik={formik}
            fieldClass="p-2"
          />

          {/* select category */}
          <SelectMenu
            label="Select Category"
            options={transformedCategories}
            fieldName="category"
            formik={formik}
            fieldClass="p-1"
          />

          <div className="col-lg-6 col-md-6 pt-3 form-group">
            <label className="fw-bold">Add New Category</label>
            <input
              type="text"
              className="form-control p-2"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
            {categories.serverErrors.map((ele) => {
              return <p style={{ color: "red" }}>{ele.msg}</p>;
            })}
            <button
              type="button"
              className="mt-2 btn btn-primary"
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </div>

          {/* Description */}
          <RichTextEditor
            label="Job Description"
            fieldName="description"
            formik={formik}
            fieldClass="custom-recruiter"
          />
        </div>

        {/* button */}
        {findJob ? (
          <AuthButton value="update job" />
        ) : (
          <AuthButton value="post job" />
        )}
      </form>
    </div>
  );
};
export default PostJob;
