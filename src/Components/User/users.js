import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  assignUserRoleHandler,
  deleteUser,
  getLimitedUsers,
  getRoles,
  getSearchingUsers,
  getUsers,
} from "../../APIS/apis";
import UsersTable from "./userTable";
import Spinner from "../Common/Spinner";
import axios from "axios";
import { productionDomain } from "../utils/utils";
import Input from "./../Common/Input";
import { Link } from "react-router-dom";
import Modal from "../Common/Modal";
import Select from "../Common/Select";
import { downloadExcel } from "react-export-table-to-excel";

const LIMIT = 10;
const Users = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getLimitedUsers(pageNumber, LIMIT)
      .then((result) => {
        setUsers(result.data.data);
        setTotalPages(result.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  }, [pageNumber]);

  const statusHandler = async (user) => {
    const message = user.status
      ? "Are you sure you want to Block User?"
      : "Are you sure you want to Unblock User?";
    const response = window.confirm(message);
    if (!response) return;
    setLoading(true);
    const allUsers = [...users];
    const index = allUsers.findIndex((item) => item._id === user._id);
    allUsers[index].status = !allUsers[index].status;
    const token = sessionStorage.getItem("godhadmin");
    const data = {
      status: allUsers[index].status,
    };
    var config = {
      method: "post",
      url: `${productionDomain}user/status/${user._id}`,
      headers: {
        "x-auth-header": token,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      await axios(config);
      setLoading(false);
      setUsers(allUsers);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  const deleteUserHandler = async (id, image) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete it? you have to be careful, this will delete all the records associated with "
    );
    if (!confirm) return;
    try {
      setLoading(true);
      await deleteUser(id);
      let allUsers = [...users];
      allUsers = allUsers.filter((itm) => itm._id !== id);
      setLoading(false);
      setUsers(allUsers);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  async function handleDownloadExcel() {
    const users = await getUsers();
    const header = [
      "_id",
      "fullName",
      "email",
      "lat",
      "lang",
      "phoneNumber",
      "status",
      "lastMenstrualPeriod",
      "isPregnant",
      "gender",
      "expectedDate",
      "dob",
      "daysLeft",
      "country",
      "city",
      "age",
      "role",
    ];
    downloadExcel({
      fileName: "users",
      sheet: "all-users",
      tablePayload: {
        header,
        body: users.map((item) => ({
          _id: item._id,
          fullName: item.fullName,
          email: item.email,
          lat: item.lat,
          lang: item.lang,
          phoneNumber: item.phoneNumber,
          status: item.status ? "live" : "block",
          lastMenstrualPeriod: item.lastMenstrualPeriod,
          isPregnant: item.isPregnant ? "Yes" : "No",
          gender: item.gender,
          expectedDate: item.expectedDate,
          dob: item.dob,
          daysLeft: item.daysLeft,
          country: item.country,
          city: item.city && item.city.name,
          age: item.age,
          role: item.role && item.role.name,
        })),
      },
    });
  }

  const nextHandler = () => {
    if (pageNumber !== totalPages) {
      setPageNumber((p) => p + 1);
    }
  };

  const previousHandler = () => {
    if (pageNumber !== 1) {
      setPageNumber((p) => p - 1);
    }
  };

  const selectHandler = (e) => {
    setRoleId(e.target.value);
  };

  const assignRoleHandler = async (id) => {
    setUserId(id);
    try {
      const res = await getRoles();
      setRoles(res);
    } catch (error) {
      alert(error.message);
    }
  };
  const searchHandler = (e) => {
    if (e.target.value.trim().length <= 0) {
      setPageNumber(1);
      return;
    }
    if (e.key === "Enter") {
      getSearchingUsers()
        .then((result) => {
          setUsers(result.data);
          setTotalPages(result.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    }
  };

  const submitRoleHandler = async () => {
    try {
      setLoading(true);
      await assignUserRoleHandler(userId, roleId);
      setLoading(false);
      alert("Role Assigned");
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <Sidebar>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <h2>Users</h2>
          <div className="row">
            <div className="col-sm-6">
              <Input placeholder="Search" onKeyDown={searchHandler} />
            </div>
            <div className="col-sm-3 mt-2">
              <button
                className="my-3 btn btn-outline-primary btn-block"
                onClick={handleDownloadExcel}
              >
                Export
              </button>
            </div>
            <div className="col-sm-3  mt-2">
              <Link
                className="my-3 btn btn-secondary btn-block"
                to="/users/add"
                state={{ user: null }}
              >
                Add User
              </Link>
            </div>
          </div>
          <UsersTable
            data={users}
            statusHandler={statusHandler}
            deleteUser={deleteUserHandler}
            assignRoleHandler={assignRoleHandler}
          />
          <div className="d-flex justify-content-end">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${pageNumber === 1 && "disabled"}`}>
                  <button className="page-link" onClick={previousHandler}>
                    Previous
                  </button>
                </li>
                <li className="mx-2 mt-2">
                  Page {pageNumber} of {totalPages}
                </li>
                <li
                  className={`page-item ${
                    pageNumber === totalPages && "disabled"
                  }`}
                >
                  <button className="page-link" onClick={nextHandler}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
      <Modal lebel="Assign Role">
        <Select
          name="role"
          label="Select Role"
          data={roles}
          searchValue="name"
          searchKey="_id"
          onChange={selectHandler}
        />
        <button onClick={submitRoleHandler} className="btn btn-primary px-3">
          Submit
        </button>
      </Modal>
    </Sidebar>
  );
};

export default Users;
