import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const NavBar = () => {
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
                <Link to="/" className="nav-link fw-bold fs-5 pt-2">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link button-auth p-2 me-3 rounded-5"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
              </li>
              <li className="nav-item">
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
