import React, { useEffect } from "react";
import { useState } from "react";
import { deleteCommentReport, getCommentReport } from "../../APIS/apis";
import Modal from "../Common/Modal";
import Table from "../Common/table";

const CommentReport = () => {
  const [data, setData] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  useEffect(() => {
    getCommentReport()
      .then((res) => setData(res))
      .catch((err) => alert(err.message));
  }, []);

  const deleteHandler = async (id) => {
    const c = window.confirm("Are you sure you want to delete it?");
    if (!c) return;
    try {
      let dCopy = [...data];
      dCopy = dCopy.filter((item) => item._id !== id);
      await deleteCommentReport(id);
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
        <button
          className="btn btn-secondary"
          data-toggle="modal"
          data-target="#commentDetailModal"
          onClick={() => setSelectedComment(c.commentId)}
        >
          Comment Details
        </button>
      ),
    },
    {
      label: "Delete",
      content: (c) => (
        <button className="btn btn-danger" onClick={() => deleteHandler(c._id)}>
          Delete
        </button>
      ),
    },
  ];
  console.log(data);
  return (
    <div className="mt-3">
      <Table coloumns={COLUMNS} data={data} />
      <Modal id="commentDetailModal" label="Details">
        {selectedComment ? (
          <>
            <p>{selectedComment.comment}</p>
          </>
        ) : (
          <p className="text-center my-3">
            Detail not found, resource maybe deleted.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default CommentReport;
