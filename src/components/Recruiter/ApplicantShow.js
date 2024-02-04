import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { startGetRecruiterApplication } from "../../actions/application-action";
import { startGetRecruiterProfile } from "../../actions/users-action";
import { StartChangeApplicationStatus } from "../../actions/application-action";

const ApplicantShow = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // get profile when the page reloads
  useEffect(() => {
    dispatch(startGetRecruiterProfile());
  }, []);

  const applications = useSelector((state) => {
    return state.application;
  });

  //show job
  useEffect(() => {
    dispatch(startGetRecruiterApplication(id));
  }, []);

  const handleChangeStatus = (applicationId, value) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      const status = {
        status: value,
      };
      dispatch(StartChangeApplicationStatus(applicationId, status));
    }
  };

  return applications.data && applications.data.length > 0 ? 
    (<div className="container card p-4 rounded-5">
      <h5 className="text-uppercase fw-bold text-auth">
        Total Applicants - {applications.data.length}
      </h5>
      <hr />

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserName</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>Experience</th>
                  <th>Download Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.data.map((ele, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{ele.applicant.creator?.userName}</td>
                      <td>{ele.applicant.creator?.email}</td>
                      <td>{ele.applicant.contactNumber}</td>
                      <td>{ele.applicant.experience}</td>
                      <td><a href={ele.resume?.resume}>Click here to Download</a></td>
                      <td>
                        {/* shortlist button */}
                          <button
                            type="button"
                            disabled={ele.status === 'ShortListed' || ele.status === 'Not ShortListed'}
                            className="btn btn-success"
                            onClick={() => {
                              handleChangeStatus(ele._id, "ShortListed");
                            }}
                          >
                            ShortList
                          </button>

                        {/* reject button */}
                          <button
                            type="button"
                            className="btn btn-danger"
                            disabled={ele.status === 'ShortListed' || ele.status === 'Not ShortListed'}
                            onClick={() => {
                              handleChangeStatus(ele._id, "Not ShortListed");
                            }}
                          >
                            Reject
                          </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>) : <p className="text-auth fw-bold text-center">No Applicants Found</p>
}
export default ApplicantShow
