import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleToggle = () => {
    const navbar = document.getElementById("navbarSupportedContent");
    navbar.classList.toggle("show");
  };

  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg ml-auto">
      <div className="container-fluid">
        <button
          className="btn btn-dark d-inline-block d-lg-none ml-auto"
          type="button"
          onClick={handleToggle}
        >
          <i className="fas fa-align-justify"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li>
              <Link to="/" className="nav-link">
                Log In
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-link">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
