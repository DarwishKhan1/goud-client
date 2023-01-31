import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";

const UsersTable = ({ data, roles }) => {
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
      label: "Email",
      key: "Email",
      content: (item) => <span>{item.email}</span>,
    },
    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/roles/managmentuser/add"}
          className="btn primary-button"
          state={{ user: item, roles: roles }}
        >
          Edit
        </Link>
      ),
    },
  ];
  return (
    <div className="my-3">
      <Table data={data} coloumns={columns} />
    </div>
  );
};

export default UsersTable;
