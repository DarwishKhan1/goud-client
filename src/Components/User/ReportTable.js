import React from "react";
import Table from "../Common/table";
import { localDomain } from "../utils/utils";
import Placeholder from "../../Assets/logoInBlack.png";

const UserTable = ({ data }) => {
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
      label: "Name",
      key: "Name",
      content: (item) => <span>{item.fullName}</span>,
    },
    {
      label: "Email",
      key: "email",
      content: (item) => <span>{item.email}</span>,
    },
    {
      label: "PhoneNumber",
      key: "PhoneNumber",
      content: (item) => <span>{item.phoneNumber}</span>,
    },
    {
      label: "Age",
      key: "Age",
      content: (item) => <span>{item.age}</span>,
    },
    {
      label: "Gender",
      key: "Gender",
      content: (item) => <span>{item.gender}</span>,
    },
  ];
  return (
    <div className="my-3">
      <Table data={data} coloumns={columns} />
    </div>
  );
};

export default UserTable;
