import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MarkButton from "./mark-button";

const getPriorities = (lvl) => {
  switch (lvl) {
    case "Low":
      return <td className="low-priority">{lvl}</td>;
    case "Medium":
      return <td className="med-priority">{lvl}</td>;
    case "High":
      return <td className="high-priority">{lvl}</td>;
    default:
      return <td>{lvl}</td>;
  }
};

const Ticket = (props) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    projectName: "",
    assignee: "",
    priority: "",
    status: "",
    type: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tickets/${props.ticket._id}`)
      .then((res) => {
        const ticketData = res.data;
        setTicket({
          title: ticketData.title,
          description: ticketData.description,
          projectName: ticketData.projectName,
          assignee: ticketData.assignee,
          priority: ticketData.priority,
          status: ticketData.status,
          type: ticketData.type,
        });
      })
      .catch((error) => console.log(error));
  }, [props.ticket._id]);

  const deleteTicket = () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      props.deleteTicket(props.ticket._id);
    }
  };

  // const onChangeStatus = (e) => {
  //   // You can add the logic to update the status here
  // };
  const onChangeStatus = () => {
    const updatedStatus = ticket.status !== "Resolved" ? "Resolved" : "Open";

    axios
      .post(`http://localhost:5000/tickets/update/${props.ticket._id}`, {
        status: updatedStatus,
      })
      .then((res) => {
        setTicket((prevTicket) => ({
          ...prevTicket,
          status: updatedStatus,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <tr>
      <td>{ticket.title}</td>
      <td>{ticket.description}</td>
      <td>{ticket.projectName}</td>
      <td>{ticket.assignee}</td>
      {getPriorities(ticket.priority)}
      <td>{ticket.status}</td>
      <td>{ticket.type}</td>
      <td>
        <Link to={`/edit/${props.ticket._id}`} className="badge badge-info">
          Edit
        </Link>
        <br />
        <a href="#" onClick={deleteTicket} className="badge badge-danger">
          Delete
        </a>
        <br />
        <MarkButton mark={ticket.status} ticketID={props.ticket._id} />
      </td>
    </tr>
  );
};

export default Ticket;
