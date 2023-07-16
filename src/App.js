import React from 'react'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Sidebar from "./components/sidebar.component";
import Dashboard from "./components/dashboard.component";
import CreateTicket from "./components/create-ticket.component";
import CreateUser from "./components/create-user.component";
import ManageUsers from "./components/manage-users.component";
import ManageProjects from "./components/manage-projects.component";
import EditTicket from "./components/edit-ticket.component";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="wrapper">
        <Sidebar />
        <div id="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tickets/create" component={CreateTicket} />
            <Route path="/manage-users" component={ManageUsers} />
            <Route path="/users/create" component={CreateUser} />
            <Route path="/manage-projects" component={ManageProjects} />
            <Route path="/edit/:id" component={EditTicket} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App