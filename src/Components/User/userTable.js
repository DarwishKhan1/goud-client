import React from "react";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";
import { Link } from "react-router-dom";

const UserTable = ({ data, statusHandler, deleteUser, assignRoleHandler }) => {
  const columns = [
    {
      label: "Image",
      key: "Image",
      content: (item) => (
        <div>
          <img
            src={
              item.image ? localDomain + "images/" + item.image : Placeholder
            }
            style={{ height: "50px", width: "80px", borderRadius: "5px" }}
            alt={item.fullName}
          />
        </div>
      ),
    },
    {
      label: "Name",
      key: "Name",
      content: (item) => <span>{item.fullName}</span>,
    },
    {
      label: "Email",
      key: "email",
      content: (item) => <span>{item.email}</span>,
    },
    {
      label: "PhoneNumber",
      key: "PhoneNumber",
      content: (item) => <span>{item.phoneNumber}</span>,
    },
    {
      label: "Age",
      key: "Age",
      content: (item) => <span>{item.age}</span>,
    },
    {
      label: "Gender",
      key: "Gender",
      content: (item) => <span>{item.gender}</span>,
    },
    {
      label: "Status",
      key: "Status",
      content: (item) => (
        <div className="custom-control custom-switch">
          <input
            type="checkbox"
            className="custom-control-input"
            id={item._id}
            checked={typeof item.status === "undefined" ? false : item.status}
            onChange={() => statusHandler(item)}
          />
          <label className="custom-control-label" htmlFor={item._id}>
            Disable/Enable
          </label>
        </div>
      ),
    },
    {
      key: "role",
      label: "",
      content: (item) => (
        <button
          className="btn btn-success"
          data-target="#paymentmodal"
          data-toggle="modal"
          onClick={() => assignRoleHandler(item._id)}
        >
          Assign Role
        </button>
      ),
    },
    {
      key: "Delete",
      label: "",
      content: (item) => (
        <Link
          className="btn btn-secondary btn-block"
          to="/users/add"
          state={{ user: item }}
        >
          View
        </Link>
      ),
    },
    {
      key: "Delete",
      label: "",
      content: (item) => (
        <button
          className="btn btn-danger"
          onClick={() => deleteUser(item._id, item.image)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <div className="my-3">
      <Table data={data} coloumns={columns} />
    </div>
  );
};

export default UserTable;
