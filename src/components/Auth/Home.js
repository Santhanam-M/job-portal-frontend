import "../../styling/styles.css";
import home_img from "../../images/home_img.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetAllJobs } from "../../actions/jobs-action";
import {Link} from 'react-router-dom'

const Home = () => {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs);

  // get all jobs
  useEffect(() => {
    dispatch(startGetAllJobs());
  }, []);


  //search functionality
  const handleSearch = () => {
    const filtered = jobs.data.filter((ele) => {
      return ele.title.toLowerCase().includes(search.toLowerCase());
    });
    setIsSearch(true);
    setFilteredJobs(filtered);
    setSearch("")
  };

  const displayJobs = (data) => {
    return data.map((ele) => {
      return (
        <div key={ele._id} className="container-fluid card rounded-0 mt-4">
          <p className="text-auth fw-semibold mt-3">
            <i className="fas fa-map-marker-alt"></i> {ele.location}
          </p>
          <h5 className="fs-4">{ele.title}</h5>
          <p className="mt-2">
            <b>Description:</b>
            <span
              className="text-muted"
              dangerouslySetInnerHTML={{ __html: ele.description }}
            ></span>
          </p>
          <div className="d-block">
            <button type="button" className="btn button-auth btn-rounded mb-3">
              {" "}
              <i className="fas fa-sign-in-alt me-2"></i>
              <Link to="/login" className='text-white'>Login to Apply</Link>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-5 col-md-5 custom-margin mb-5">
          <h6 className="display-5 fw-semibold custom-header">
            Your Next Career Start Here!
          </h6>
          <p className="fs-5 text-primary mt-4">
            Find your best job better and faster
          </p>

          <form>
            <div className="input-group">
              <input
                className="form-control border-0 shadow-lg"
                placeholder="ex : frontend, devops"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="button" className='btn button-auth' onClick={handleSearch}>
                search
              </button>
            </div>
          </form>
        </div>
        <div className="col-lg-7 col-md-7">
          <img src={home_img} className="custom-img" />
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-4 col-md-4"></div>
        <div className="col-lg-8 col-md-8">
          {isSearch && filteredJobs.length === 0 ? (
            <p className="fs-3 text-danger text-center">No jobs found, stay tuned to get updates</p>
          ) : (
            displayJobs(isSearch ? filteredJobs : jobs.data)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
