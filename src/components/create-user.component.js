import React, { useState, useEffect } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved"];
const types = ["Bug/Error", "Feature Request", "Security", "Other"];

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState(priorities[0]);
  const [status, setStatus] = useState(statuses[0]);
  const [type, setType] = useState(types[0]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setPriority(priorities[0]);
    setStatus(statuses[0]);
    setType(types[0]);

    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.name));
          setAssignee(res.data[0].name);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/projects/")
      .then((res) => {
        if (res.data.length > 0) {
          setProjects(res.data.map((project) => project.name));
          setProjectName(res.data[0].name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeProjectName = (e) => {
    setProjectName(e.target.value);
  };

  const onChangeAssignee = (e) => {
    setAssignee(e.target.value);
  };

  const onChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const ticket = {
      title: title,
      description: description,
      projectName: projectName,
      assignee: assignee,
      priority: priority,
      status: status,
      type: type,
    };

    axios
      .post("http://localhost:5000/tickets/create", ticket)
      .then((res) => console.log(res.data));

    alert("Successfully created.");

    // Clear form
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");
    setType("");
  };

  return (
    <div>
      <h3>Submit a Ticket</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea
            style={{ resize: "none" }}
            type="text"
            maxLength="250"
            rows="3"
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Project Name: </label>
          <select
            className="form-control"
            value={projectName}
            onChange={onChangeProjectName}
          >
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Assigned To: </label>
          <select
            className="form-control"
            value={assignee}
            onChange={onChangeAssignee}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Priority: </label>
          <select
            className="form-control"
            value={priority}
            onChange={onChangePriority}
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Status: </label>
          <select
            className="form-control"
            value={status}
            onChange={onChangeStatus}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Type: </label>
          <select className="form-control" value={type} onChange={onChangeType}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Ticket"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTicket;
