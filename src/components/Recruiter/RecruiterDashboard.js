import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetRecruiterProfile } from "../../actions/users-action";
import DashBoard from "../DashBoard";
import { startGetMyJobs } from "../../actions/jobs-action";
import { startGetApplications } from "../../actions/application-action";
import { PieChart } from "react-chartkick";
import "chartkick/chart.js";

const RecruiterDashboard = () => {
  const dispatch = useDispatch();

  // get profile
  useEffect(() => {
    dispatch(startGetRecruiterProfile());
  }, []);

  // get myjobs
  useEffect(() => {
    dispatch(startGetMyJobs());
  }, []);

  // get application
  useEffect(() => {
    dispatch(startGetApplications());
  }, []);

  const myJobs = useSelector((state) => {
    return state.jobs.data;
  });

  const myApplications = useSelector((state) => {
    return state.application.data;
  });

  const shortListed = myApplications.filter((ele) => {
    return ele.status === "ShortListed";
  });

  const pending = myApplications.filter((ele) => {
    return ele.status === "Pending";
  });

  //Count the number of fresher and experienced
  const frequency = myApplications.reduce(
    (acc, cv) => {
      if (cv.applicant.experience === "fresher") {
        acc.fresher++;
      } else {
        acc.experience++;
      }
      return acc;
    },
    { fresher: 0, experience: 0 }
  );

  return (
    <div className="container card rounded-5 p-4">
      <h5 className="text-uppercase fw-bold text-auth ps-1">
        DashBoard Details
      </h5>
      <hr />
      <div className="row">
        <DashBoard
          title="Jobs Created"
          bgColor="warning"
          iconClass="fa-solid fa-briefcase"
          value={myJobs.length}
        />

        <DashBoard
          title="Shortlisted"
          bgColor="success"
          iconClass="fa-solid fa-check"
          value={shortListed.length}
        />

        <DashBoard
          title="pending"
          bgColor="danger"
          iconClass="fa-regular fa-hourglass"
          value={pending.length}
        />
      </div>
      <br />

      {myJobs.length > 0 && <PieChart data={Object.entries(frequency)} />}
    </div>
  );
};
export default RecruiterDashboard;
