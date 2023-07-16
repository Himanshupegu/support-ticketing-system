import React, { useState, useEffect } from "react";
import axios from "axios";

const priorities = ["Low", "Medium", "High"];
const statuses = ["Open", "In Progress", "Resolved"];
const types = ["Bug/Error", "Feature Request", "Security", "Other"];

const EditTicket = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tickets/${props.match.params.id}`)
      .then((res) => {
        const ticketData = res.data;
        setTitle(ticketData.title);
        setDescription(ticketData.description);
        setProjectName(ticketData.projectName);
        setAssignee(ticketData.assignee);
        setPriority(ticketData.priority);
        setStatus(ticketData.status);
        setType(ticketData.type);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        if (res.data.length > 0) {
          setUsers(res.data.map((user) => user.name));
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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.match.params.id]);

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
      .post(
        `http://localhost:5000/tickets/update/${props.match.params.id}`,
        ticket
      )
      .then((res) => console.log(res.data));

    alert("Successfully updated.");
  };

  return (
    <div>
      <h3>Edit Ticket</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            required
            className="form-control"
            value={title}
            onChange={onChangeTitle}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Project: </label>
          <select
            required
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
          <label>Assignee: </label>
          <select
            required
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
            required
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
            required
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
          <select
            required
            className="form-control"
            value={type}
            onChange={onChangeType}
          >
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
            value="Update Ticket"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default EditTicket;
