import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetMyJobs, startRemoveJob } from "../../actions/jobs-action";
import { startGetRecruiterProfile } from "../../actions/users-action";
import {Link} from 'react-router-dom'

const MyJobs = () => {
  const dispatch = useDispatch();
  const myJobs = useSelector((state) => state.jobs)

  //get my jobs
  useEffect(() => {
    dispatch(startGetMyJobs());
  }, []);

  //get profile when page reloads
  useEffect(() => {
    dispatch(startGetRecruiterProfile());
  }, []);

  //delete job
  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch(startRemoveJob(id));
    }
  };

  return myJobs.data.length > 0 ? (
    <div className="container card rounded-5 p-4">
      <h5 className="text-uppercase fw-bold text-auth ps-1">
        My jobs - {myJobs.data.length}
      </h5>
      <hr/>

      <div className="row">
        <div className="col-lg-12 col-md-12">
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Id</th>
                  <th>Title</th>
                  <th>Skills</th>
                  <th>Deadline</th>
                  <th>Experience</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myJobs.data.map((ele, i) => {
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><Link to={`/myJobs/${ele._id}`}>{ele._id}</Link></td>
                      <td>{ele.title}</td>
                      <td>{ele.skills.join(", ")}</td>
                      <td>
                        {new Date(ele.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td>{ele.experience}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-success btn-rounded"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-rounded"
                          onClick={() => {
                            handleDelete(ele._id);
                          }}
                        >
                          Delete
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
    </div>
  ) : (
    <p className="text-auth fw-bold text-center">No Jobs Found</p>
  );
};

export default MyJobs;
