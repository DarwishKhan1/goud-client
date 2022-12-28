import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";

const SymptomsTable = ({ data, deleteSymptom }) => {
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
            style={{ height: "70px", width: "70px", borderRadius: "5px" }}
          />
        </div>
      ),
    },
    {
      label: "Symptom",
      key: "Symptom",
      content: (item) => <span>{item.symptom}</span>,
    },

    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/symptoms/add"}
          className="btn primary-button"
          state={{ symptom: item }}
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
          to={"/categories/add"}
          className="btn btn-danger"
          onClick={() => deleteSymptom(item._id, item.image)}
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

export default SymptomsTable;
