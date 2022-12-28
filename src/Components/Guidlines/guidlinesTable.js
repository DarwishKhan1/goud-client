import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";

const GuidlinesTable = ({ data, deleteGuidline }) => {
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
      label: "Title",
      key: "Title",
      content: (item) => <span>{item.title}</span>,
    },

    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/guidlines/add"}
          className="btn primary-button"
          state={{ guidline: item }}
        >
          View / Edit
        </Link>
      ),
    },
    {
      key: "Delete",
      label: "",
      content: (item) => (
        <button
          to={"/guidlines/add"}
          className="btn btn-danger"
          onClick={() => deleteGuidline(item._id, item.image)}
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

export default GuidlinesTable;
