import { useEffect, useState } from "react";
import { startGetApplicantProfile } from "../../actions/users-action";
import { useDispatch, useSelector } from "react-redux";
import { startGetAllJobs } from "../../actions/jobs-action";
import {
  startApplyjob,
  startGetApplications,
} from "../../actions/application-action";
import { startGetMyResumes } from "../../actions/resume-action";

const JobsList = () => {
  const [resume, setResume] = useState({});
  const dispatch = useDispatch();

  const application = useSelector((state) => state.application);
  const jobs = useSelector((state) => state.jobs)
  const resumes = useSelector((state) => state.resume)

  //get profile when the page reloads
  useEffect(() => {
    dispatch(startGetApplicantProfile());
  }, []);

  //get all jobs
  useEffect(() => {
    dispatch(startGetAllJobs());
  }, []);

  //get my application
  useEffect(() => {
    dispatch(startGetApplications());
  }, []);

  // get resumes
  useEffect(() => {
    dispatch(startGetMyResumes());
  }, []);

  //resume updating
  const handleResumeChange = (jobId, event) => {
    setResume({ ...resume, [jobId]: event.target.value });
  };

  //apply jobs
  const handleApply = (jobId) => {
    if (!resume[jobId]) {
      alert("Please select the resume and apply for job");
    } else {
      dispatch(startApplyjob(jobId, resume[jobId]));
    }
  };

  return jobs.data.length > 0 ? (
    <div className="container card p-4 rounded-5">
      <h5 className="text-uppercase fw-bold text-auth ps-2">
        Total Jobs
      </h5>

      <hr/>
      <div className="row">
        {jobs.data.map((job, index) => {
          const isJobApplied =
            application.data &&
            application.data.length > 0 &&
            application.data.some((ele) => (ele.job == job._id || ele.job?._id == job._id ));
           console.log(isJobApplied) 
          return (
            <div key={index} className="col-lg-6 col-md-6 p-4">
              <div className="card job">
                <h4 className="card-header fw-bolder">
                  {job.creator.companyName}
                </h4>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Job Title</strong> : {job.title}
                  </p>
                  <p className="card-text">
                    <strong>Skills Required</strong> : {job.skills.join(", ")}
                  </p>
                  <p className="card-text">
                    <strong>Salary</strong> : {job.salary}
                  </p>
                  <p className="card-text">
                    <strong>Experience</strong> : {job.experience}
                  </p>
                  <p className="card-text">
                    <strong>Date of Posting</strong> :{" "}
                    {new Date(job.dateOfPosting).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="card-text">
                    <strong>Deadline</strong> :{" "}
                    {new Date(job.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* conditional check to display the dropdown and apply button */}
                {!isJobApplied && (
                  <>
                    {/* Dropdown for resume */}
                    <select
                      className="mb-3 customize-select"
                      value={resume[job._id] || ""}
                      onChange={(e) => {
                        handleResumeChange(job._id, e);
                      }}
                    >
                      <option value="">
                        Select appropriate resume and apply
                      </option>
                      {resumes.data.map((ele, i) => {
                        return (
                          <option key={i} value={ele._id}>
                            {ele.title}
                          </option>
                        );
                      })}
                    </select>

                    {/* Apply Button */}
                    <button
                      type="button"
                      className="btn customize-button"
                      onClick={() => handleApply(job._id)}
                    >
                      Apply now
                    </button>
                  </>
                )}

                {/* Applied Button */}
                {isJobApplied && (
                  <button type="button" className="btn btn-success">
                    Applied
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <p className="text-auth fw-bold text-center">No Jobs Found</p>
  );
};

export default JobsList;
