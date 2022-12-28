import React from "react";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";
import { Link } from "react-router-dom";

const UserTable = ({ data, statusHandler, deleteDoctorHandler }) => {
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
          />
        </div>
      ),
    },
    {
      label: "Name",
      key: "Name",
      content: (item) => <span>{item.name}</span>,
    },
    {
      label: "Qualification",
      key: "qualification",
      content: (item) => <span>{item.qualification}</span>,
    },
    {
      label: "Rating",
      key: "Rating",
      content: (item) => <span>{item.rating}</span>,
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
      label: "View/Edit",
      key: "EditDoctor",
      content: (item) => (
        <Link
          className=" btn btn-secondary"
          to={"/doctors/add"}
          state={{ doctor: item }}
        >
          View/Edit
        </Link>
      ),
    },
    {
      label: "Delete",
      key: "DeleteDoctor",
      content: (item) => (
        <button
          className=" btn btn-danger"
          onClick={() => deleteDoctorHandler(item._id, item.image)}
        >
          Delete
        </button>
      ),
    },
  ];
  return (
    <div className="my-3">
      <Table data={data} coloumns={columns} />{" "}
    </div>
  );
};

export default UserTable;
