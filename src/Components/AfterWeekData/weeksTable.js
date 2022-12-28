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
        (
          <div>
            <img
              src={
                item.imageUrl && item.imageUrl !== "null"
                  ? localDomain + "images/" + item.imageUrl
                  : Placeholder
              }
              style={{ height: "80px", width: "80px", borderRadius: "5px" }}
              alt="week mage"
            />
          </div>
        )
      ),
    },
    {
      label: "Title",
      key: "Title",
      content: (item) => <span>{item.title}</span>,
    },
    {
      label: "WeekNo",
      key: "week No OR Month No",
      content: (item) => <span>{item.week_or_month}</span>,
    },
    {
      label: "Month OR Week",
      key: "MonthOrWeek",
      content: (item) => <span>{item.isWeek ? "Week" : "Month"}</span>,
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
          to={"/afterweek/add"}
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
