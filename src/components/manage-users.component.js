import React, { useState, useEffect } from "react";
import axios from "axios";

import CreateUser from "./create-user.component";

const User = (props) => {
  const deleteUser = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/users/${props.user._id}`)
        .then((res) => {
          console.log(res.data);
          props.deleteUser(props.user._id);
        });
    }
  };

  return (
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.role}</td>
      <td>
        <a href="#" onClick={deleteUser} className="badge badge-danger">
          Delete
        </a>
      </td>
    </tr>
  );
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
  };

  const getUsers = () => {
    return users.map((currentUser) => (
      <User user={currentUser} deleteUser={deleteUser} key={currentUser._id} />
    ));
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{getUsers()}</tbody>
      </table>
      <br></br>
      <CreateUser />
    </div>
  );
};

export default ManageUsers;
