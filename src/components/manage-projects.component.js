import React, { useState, useEffect } from "react";
import axios from "axios";

import CreateProject from "./create-project.component";

const Project = (props) => {
  const deleteProject = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      axios
        .delete(`http://localhost:5000/projects/${props.project._id}`)
        .then((res) => {
          console.log(res.data);
          props.deleteProject(props.project._id);
        });
    }
  };

  return (
    <tr>
      <td>{props.project.name}</td>
      <td>
        <a href="#" onClick={deleteProject} className="badge badge-danger">
          Delete
        </a>
      </td>
    </tr>
  );
};

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== id)
    );
  };

  const getProjects = () => {
    return projects.map((currentProject) => (
      <Project
        project={currentProject}
        deleteProject={deleteProject}
        key={currentProject._id}
      />
    ));
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{getProjects()}</tbody>
      </table>
      <br></br>
      <CreateProject />
    </div>
  );
};

export default ManageProjects;
