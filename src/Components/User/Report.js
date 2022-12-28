import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import { useLocation } from "react-router-dom";
import ReportTable from "./ReportTable";

const UsersPrint = () => {
  const componentRef = useRef();
  const location = useLocation();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <ReportTable data={location.state.data} />
      </div>
      <div className="text-center">
        <button className="btn primary-button m-2 px-5" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default UsersPrint;
