import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";

const EventsTable = ({ data, deleteEvent }) => {
  const columns = [
    {
      label: "Image",
      key: "Image",
      content: (item) => (
        <div>
          <img
            src={
              item.image
                ? localDomain + "images/" + item.image
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
      content: (item) => <span>{item.name}</span>,
    },

    {
      label: "Venue",
      key: "Venue",
      content: (item) => <span>{item.venue}</span>,
    },
    {
      label: "Date",
      key: "Date",
      content: (item) => <span>{item.date}</span>,
    },
    {
      label: "Time",
      key: "Time",
      content: (item) => <span>{item.time}</span>,
    },
    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/events/add"}
          className="btn primary-button"
          state={{ event: item }}
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
          className="btn btn-danger"
          onClick={() => deleteEvent(item._id, item.image)}
        >
          Delete
        </button>
      ),
    },
    {
      key: "Users",
      label: "",
      content: (item) => (
        <Link
          to={"/events/users"}
          className="btn primary-button"
          state={{ users: item.users }}
        >
          Users
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

export default EventsTable;
