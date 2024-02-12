import "../../styling/styles.css";
import home_img from "../../images/home_img.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetAllJobs } from "../../actions/jobs-action";
import { startGetCategory } from "../../actions/category-action";
import { Link, createRoutesFromChildren } from "react-router-dom";

const Home = () => {
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categoryJobs, setCategoryJobs] = useState([]);

  const dispatch = useDispatch();

  const jobs = useSelector((state) => state.jobs);
  const categories = useSelector((state) => state.category);

  // get all jobs and category
  useEffect(() => {
    dispatch(startGetAllJobs());
    dispatch(startGetCategory());
  }, []);

  useEffect(() => {
    setIsSearch(false);
    if (categoryId === "all") {
      return setCategoryJobs(jobs.data);
    } else if (categoryId) {
      const findCategoryJob = jobs.data.filter((ele) => {
        return ele.category === categoryId;
      });
      console.log("findCategoryJob", findCategoryJob);
      setCategoryJobs(findCategoryJob);
    }
  }, [categoryId]);

  const handleSearch = () => {
    const dataToSearch = categoryId ? categoryJobs : jobs.data;
    const searchJob = dataToSearch.filter((ele) => {
      return ele.title.toLowerCase().includes(search.toLowerCase());
    });
    console.log("searchJob", searchJob);
    setIsSearch(true);
    setFilteredJobs(searchJob);
    setSearch("");
  };

  const displayJobs = (data) => {
    return data.map((ele) => {
      return (
        <div key={ele._id} className="p-3 card rounded-0 mb-3">
          <p className="text-warning fw-semibold mt-3">
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
            <button type="button" className="btn btn-warning btn-rounded mb-3">
              {" "}
              <i className="fas fa-sign-in-alt me-2"></i>
              <Link to="/login" className="text-white">
                Login to Apply
              </Link>
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container home">
      {/*search and image display */}
      <div className="row align-items-center">
        <div className="col-lg-5 col-md-5 custom-margin mb-5">
          <h6 className="display-5 fw-semibold custom-header">
            Your Next Career Start Here!
          </h6>
          <p className="fs-4 text-auth mt-4">
            Find your best job better and faster
          </p>
        </div>
        <div className="col-lg-7 col-md-7">
          <img src={home_img} className="custom-img" alt="Home" />
        </div>
      </div>

      {/* Filter job and display job */}
      {jobs.data.length > 0 ? (
        <>
          <div className="row justify-content-center mt-2">
            {/* Filter jobs by category */}
            <div className="col-lg-4 col-md-4 mt-4">
              <div className="card rounded-0 p-3">
                <p className="fw-bold text-warning">Filter job by category</p>
                <form>
                  <div className="input-group">
                    <select
                      className="form-select rounded-3 pb-0"
                      onChange={(e) => {
                        setCategoryId(e.target.value);
                      }}
                    >
                      <option value="all">All</option>
                      {categories.data.map((ele) => {
                        return (
                          <option value={ele._id} key={ele._id}>
                            {ele.categoryName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </form>
              </div>
            </div>

            {/* search job by category */}
            <div className="col-lg-4 col-md-4 mt-4">
              <div className="card rounded-0 p-3 pb-3">
                <p className="text-warning fw-bold">Search jobs</p>
                <form>
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="ex : frontend, devops"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={handleSearch}
                    >
                      search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Display Jobs */}
          <div className="row">
            <div className="col-lg-12 col-md-12 mt-4">
              {isSearch ? (
                filteredJobs.length > 0 ? (
                  displayJobs(filteredJobs)
                ) : (
                  <p className='fw-semibold fs-5 text-danger text-center'>No Jobs Found. Stay Tuned for Updates</p>
                )
              ) : categoryId ? (
                categoryJobs.length > 0 ? (
                  displayJobs(categoryJobs)
                ) : (
                  <p className='fw-semibold fs-5 text-danger'>No Jobs Found. Stay Tuned for Updates</p>
                )
              ) : (
                displayJobs(jobs.data)
              )}
            </div>
          </div>
        </>
      ) : (
        <p className='fw-semibold fs-5 text-center text-danger'>No Jobs Found. Stay Tuned for Updates</p>
      )}
    </div>
  );
};

export default Home;
