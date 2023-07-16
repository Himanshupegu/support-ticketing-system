import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <center>
        <img
          src={logo}
          className="navbar-brand"
          width="120"
          alt="Tech support"
        />
      </center>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            <i className="fas fa-home"></i>
            Dashboard Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/tickets/create"
            className="nav-link"
            activeClassName="active"
          >
            <i className="fas fa-ticket-alt"></i>
            Submit a Ticket
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/manage-users"
            className="nav-link"
            activeClassName="active"
          >
            <i className="fas fa-users"></i>
            Manage Users
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/manage-projects"
            className="nav-link"
            activeClassName="active"
          >
            <i className="fas fa-folder"></i>
            Manage Projects
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
