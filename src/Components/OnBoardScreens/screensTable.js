import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";
import Placeholder from "../../Assets/logoInBlack.png";
import { localDomain } from "../utils/utils";

const CategoriesTable = ({ data, deleteScreen }) => {
  const columns = [
    {
      label: "#",
      key: "Index",
      content: (item, index) => <span>{index}</span>,
    },

    {
      label: "Image",
      key: "image",
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
      label: "Title",
      path: "title",
    },
    {
      label: "Description",
      path: "description",
    },
    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/onboardscreendata/add"}
          className="btn primary-button"
          state={{ screen: item }}
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
          className="btn btn-danger"
          onClick={() => deleteScreen(item._id, item.image)}
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
