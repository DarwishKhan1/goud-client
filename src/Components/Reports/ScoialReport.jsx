import React, { useEffect } from "react";
import { useState } from "react";
import { deleteSocialReport, getSocialReport } from "../../APIS/apis";
import Table from "../Common/table";

const SocialReport = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getSocialReport()
      .then((res) => setData(res))
      .catch((err) => alert(err.message));
  }, []);

  const deleteHandler = async (id) => {
    const c = window.confirm("Are you sure you want to delete it?");
    if (!c) return;
    try {
      let dCopy = [...data];
      dCopy = dCopy.filter((item) => item._id !== id);
      await deleteSocialReport(id);
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
      label: "Delete",
      content: (c) => (
        <button className="btn btn-danger" onClick={() => deleteHandler(c._id)}>
          Delete
        </button>
      ),
    },
  ];
  return (
    <div className="mt-3">
      <Table coloumns={COLUMNS} data={data} />
    </div>
  );
};

export default SocialReport;
