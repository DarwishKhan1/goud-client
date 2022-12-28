import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";

const CategoriesTable = ({ data, deleteCategory }) => {
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
          to={"/categories/add"}
          className="btn primary-button"
          state={{ category: item }}
        >
          Edit
        </Link>
      ),
    },
    {
      key: "Delete",
      label: "",
      content: (item) => (
        <button
          to={"/categories/add"}
          className="btn btn-danger"
          onClick={() => deleteCategory(item._id)}
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

export default CategoriesTable;
