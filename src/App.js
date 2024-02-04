import NavBar from "./components/NavBar";
import Home from "./components/Auth/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PostJob from "../src/components/Recruiter/PostJob";
import { ToastContainer, Zoom } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RecruiterProfile from "./components/Recruiter/RecruiterProfile";
import ApplicantProfile from "./components/Applicant/ApplicantProfile";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getRole } from "./actions/users-action";
import ResumeUpload from "./components/Applicant/ResumeUpload";
import JobsList from "./components/Applicant/JobsList";
import MyJobs from "./components/Recruiter/MyJobs";
import AppliedJobs from "./components/Applicant/AppliedJobs";
import ApplicantShow from "./components/Recruiter/ApplicantShow";
import ApplicantDashboard from "./components/Applicant/ApplicantDashboard";
import RecruiterDashboard from "./components/Recruiter/RecruiterDashboard";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    dispatch(getRole(storedUserRole));
  }, []);

  const role = useSelector((state) => {
    return state.users.role;
  });

  console.log("role", role);

  return (
    <div>
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar
        transition={Zoom}
      />
      <BrowserRouter>
        <NavBar />
        <Routes>
          {/* Common Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Recruiter Routes */}
          <Route
            path="/myProfile"
            element={
              <AppLayout>
                {role === "recruiter" && <RecruiterProfile />}
                {role === "applicant" && <ApplicantProfile />}
              </AppLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                {role === 'recruiter' && <RecruiterDashboard/>}
                {role === 'applicant' && <ApplicantDashboard/>}
              </AppLayout>
            }
          />
          <Route
            path="/postJob"
            element={
              <AppLayout>
                <PostJob />
              </AppLayout>
            }
          />
          <Route
            path="/myJobs"
            element={
              <AppLayout>
                <MyJobs />
              </AppLayout>
            }
          />
          <Route
            path="/resume"
            element={
              <AppLayout>
                <ResumeUpload />
              </AppLayout>
            }
          />

          <Route
            path="/alljobs"
            element={
              <AppLayout>
                <JobsList />
              </AppLayout>
            }
          />

          <Route
            path="/applicationStatus"
            element={
              <AppLayout>
                <AppliedJobs />
              </AppLayout>
            }
          />

          <Route
            path="/myjobs/:id"
            element={
              <AppLayout>
                <ApplicantShow />
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
