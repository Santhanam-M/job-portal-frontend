import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { removeUser } from "../actions/users-action";

const NavBar = () => {

  const dispatch = useDispatch()

  //home button is clicked clear localstorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    dispatch(removeUser());
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white custom-border fixed-top">
        <div className="container">
          {/* NavBar Brand */}
          <h1 className="navbar-brand fw-bolder my-auto head">
            <img src={logo} className="me-2 logo" alt="JobMate Logo" />
            Job<span>Mate</span>
          </h1>

          {/* Toggle Button*/}
          <button
            data-mdb-collapse-init
            type="button"
            className="navbar-toggler"
            data-mdb-target="#simple-navbar"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="simple-navbar">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link fw-bold fs-5 pt-2"
                  onClick={handleLogout}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item margin-login">
                <Link
                  to="/login"
                  className="nav-link button-auth p-2 rounded-5"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
              </li>
              
              <li className="nav-item margin-register">
                <Link
                  to="/register"
                  className="nav-link button-auth p-2 rounded-5"
                >
                  <i className="fas fa-user-plus me-2"></i>Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
