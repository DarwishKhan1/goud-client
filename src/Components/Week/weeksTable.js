import React from "react";
import { Link } from "react-router-dom";
import Table from "./../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";

const RequestTable = ({ data, deleteWeek }) => {
  const columns = [
    {
      label: "Image",
      key: "Image",
      content: (item) => (
        <div>
          <img
            src={
              item.imageUrl
                ? localDomain + "images/" + item.imageUrl
                : Placeholder
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
      label: "WeekNo",
      key: "week No",
      content: (item) => <span>{item.weekNo}</span>,
    },
    {
      label: "Baby Length",
      key: "Baby Length",
      content: (item) => <span>{item.babyLength}</span>,
    },
    {
      label: "Baby Weight",
      key: "Baby Weight",
      content: (item) => <span>{item.babyWeight}</span>,
    },
    {
      label: "Description",
      key: "Description",
      content: (item) => <span>{item.shortDescription}</span>,
    },
    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/weeks/add"}
          className="btn primary-button"
          state={{ week: item }}
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
          onClick={() => deleteWeek(item._id, item.imageUrl)}
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

export default RequestTable;
