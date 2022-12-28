import React from "react";
import { Link } from "react-router-dom";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";

const ArticleTable = ({ data, deleteArticle }) => {
  const columns = [
    {
      label: "Image",
      key: "Image",
      content: (item) => (
        <div>
          <img
            src={item.url ? localDomain + "images/" + item.url : Placeholder}
            style={{ height: "50px", width: "80px", borderRadius: "5px" }}
            alt="Article images"
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
      label: "Category",
      key: "Category",
      content: (item) => <span>{item.categoryId && item.categoryId.name}</span>,
    },
    {
      key: "Edit",
      label: "",
      content: (item) => (
        <Link
          to={"/articles/add"}
          className="btn primary-button"
          state={{ article: item }}
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
          onClick={() => deleteArticle(item._id, item.url)}
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

export default ArticleTable;
