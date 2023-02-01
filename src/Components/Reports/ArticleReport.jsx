import React, { useEffect } from "react";
import { useState } from "react";
import { deleteArticleReport, getArticlesReport } from "../../APIS/apis";
import Table from "./../Common/table";
const ArticleReport = () => {
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  useEffect(() => {
    getArticlesReport()
      .then((res) => setData(res))
      .catch((err) => alert(err.message));
  }, []);

  const deleteHandler = async (id) => {
    const c = window.confirm("Are you sure you want to delete it?");
    if (!c) return;
    try {
      let dCopy = [...data];
      dCopy = dCopy.filter((item) => item._id !== id);
      await deleteArticleReport(id);
      setData(dCopy);
      alert("Deleted!");
    } catch (error) {
      alert(error.message);
    }
  };

  const COLUMNS = [
    { label: "S.No", content: (c, i) => <span>{i}</span> },
    { path: "comment", label: "Comment" },
    {
      label: "",
      content: (c) => (
        <button className="btn btn-danger" onClick={() => deleteHandler(c._id)}>
          Delete
        </button>
      ),
    },
    // {
    //   label: "",
    //   content: (c) => (
    //     <button
    //       className="btn btn-secondary"
    //       data-toggle="modal"
    //       data-target="#ArticleDetailModal"
    //       onClick={() => setSelectedArticle(c.articleId)}
    //     >
    //       Article Details
    //     </button>
    //   ),
    // },
  ];
  return (
    <div className="mt-3">
      <Table coloumns={COLUMNS} data={data} />
      {/* <Modal id="ArticleDetailModal" label="Article Details">
        <h5>{selectedArticle.title}</h5>
      </Modal> */}
    </div>
  );
};

export default ArticleReport;
