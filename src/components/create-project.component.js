import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateProject = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/projects/")
      .then((res) => {
        if (res.data.length > 0) {
          setProjects(res.data.map((project) => project.name));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const project = {
      name: name,
    };

    console.log(project);

    axios
      .post("http://localhost:5000/projects/create", project)
      .then((res) => console.log(res.data));

    // Clear form
    setName("");
  };

  return (
    <div>
      <h3>Create New Project</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Project: </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={onChangeName}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Project"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
