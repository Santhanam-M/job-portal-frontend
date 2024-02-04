import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../actions/users-action";
import { useSelector } from "react-redux";

const SideBar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    dispatch(removeUser());
  };

  const users = useSelector((state) => {
    return state.users;
  });

  const recruiterAuthorized =
    users.data.recruiter ||
    (users.data.creator && users.data.creator.role === "recruiter");
  const applicantAuthorized =
    users.data.applicant ||
    (users.data.creator && users.data.creator.role === "applicant");

  return (
    // {/*sidebar */}
    <div className="sidebar sticky-top">
      <div className="list-group">
        <Link
          to="/myProfile"
          className="list-group-item list-group-item-action m-2 text-uppercase"
        >
          <i className="fa-solid fa-user me-3"></i>Profile
        </Link>

        {applicantAuthorized && (
          <>
            <Link
              to="/dashboard"
              className="list-group-item list-group-item-action m-2 text-uppercase"
            >
              <i className="fas fa-tachometer-alt me-3"></i>DashBoard
            </Link>

            <Link
              to="/resume"
              className="list-group-item list-group-action m-2 text-uppercase"
            >
              <i className="fa fa-file me-3"></i>Resume
            </Link>

            <Link
              to="/allJobs"
              className="list-group-item list-group-action m-2 text-uppercase"
            >
              <i className="fas fa-briefcase me-3"></i>jobs
            </Link>

            <Link
              to="/applicationStatus"
              className="list-group-item list-group-action m-2 text-uppercase"
            >
              <i className="fa fa-check me-3" aria-hidden="true"></i>Applied
              Jobs
            </Link>
          </>
        )}

        {recruiterAuthorized && (
          <>
            <Link
              to="/dashboard"
              className="list-group-item list-group-item-action m-2 text-uppercase"
            >
              <i className="fas fa-tachometer-alt me-3"></i>DashBoard
            </Link>

            <Link
              to="/postJob"
              className="list-group-item list-group-item-action m-2 text-uppercase"
            >
              <i className="fas fa-briefcase me-3"></i>Post A Job
            </Link>

            <Link
              to="/myJobs"
              className="list-group-item list-group-item-action m-2 text-uppercase"
            >
              <i className="fa-solid fa-list me-3"></i>My Jobs
            </Link>
          </>
        )}

        <Link
          to="/"
          className="list-group-item list-group-item-action m-2 text-uppercase"
          onClick={handleLogout}
        >
          <i className="fas fa-power-off me-3"></i>Logout
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
