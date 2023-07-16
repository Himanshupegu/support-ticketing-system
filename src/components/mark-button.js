import React, { useState, useEffect } from "react";
import axios from "axios";

const MarkButton = ({ _id }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    projectName: "",
    assignee: "",
    priority: "",
    status: "",
    type: "",
  });

  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/tickets/" + _id)
      .then((res) => {
        setTicket(res.data);
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
  }, [_id]);

  const handleClick = (e) => {
    e.preventDefault();

    const newStatus = ticket.status !== "Resolved" ? "Resolved" : "Open";

    const updatedTicket = {
      ...ticket,
      status: newStatus,
    };

    axios
      .post("http://localhost:5000/tickets/update/" + _id, updatedTicket)
      .then((res) => {
        console.log(res.data);
      });

    alert("Successfully updated.");
  };

  return (
    <>
      {ticket.status !== "Resolved" ? (
        <a href="#" onClick={handleClick} className="badge badge-success">
          Mark as Resolved
        </a>
      ) : (
        <a href="#" onClick={handleClick} className="badge badge-secondary">
          Mark as Open
        </a>
      )}
    </>
  );
};

export default MarkButton;
