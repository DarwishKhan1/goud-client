import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";

const RolesTable = ({ data, deleteRole }) => {
  const columns = [
    {
      label: "#",
      key: "Index",
      content: (item, index) => <span>{index}</span>,
    },

    {
      label: "Name",
      key: "Name",
      content: (item) => <span>{item.name}</span>,
    },
    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/roles/add"}
          className="btn primary-button"
          state={{ role: item }}
        >
          Edit
        </Link>
      ),
    },
    {
      key: "Delete",
      label: "",
      content: (item) => (
        <button className="btn btn-danger" onClick={() => deleteRole(item._id)}>
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

export default RolesTable;
