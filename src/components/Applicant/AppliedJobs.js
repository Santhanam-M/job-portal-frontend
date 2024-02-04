import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetApplicantProfile } from "../../actions/users-action";
import { startGetApplications } from "../../actions/application-action";

const AppliedJobs = () => {
  const dispatch = useDispatch();

  const applications = useSelector((state) => state.application);

  //get profile when the page reloads
  useEffect(() => {
    dispatch(startGetApplicantProfile());
  }, []);

  //get my application status
  useEffect(() => {
    dispatch(startGetApplications());
  }, []);

  return applications.data && applications.data.length > 0 ? (
    <div className="container card p-4 rounded-5">
      <h5 className="text-uppercase fw-bold text-auth ps-1">Applied Jobs</h5>
      <hr/>
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Skills</th>
                  <th>Location</th>
                  <th>Experience</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {applications.data && applications.data.map((ele, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{ele.job.title}</td>
                      <td>{(ele.job?.skills) && ele.job.skills.join(", ")}</td>
                      <td>{ele.job.location}</td>
                      <td>{ele.job.experience}</td>
                      <td> 
                        <span className={ele.status === 'Pending' ? 'text-pending' : 
                                        ele.status === 'ShortListed' ? 'text-shortlisted' : 'text-not-shortlisted'}>
                          {ele.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-auth fw-bold text-center">No Applications Found</p>
  );
};

export default AppliedJobs;
