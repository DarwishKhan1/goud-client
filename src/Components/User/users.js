import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { deleteUser } from "../../APIS/apis";
import UsersTable from "./userTable";
import Spinner from "../Common/Spinner";
import axios from "axios";
import { productionDomain } from "../utils/utils";
import Input from "./../Common/Input";
import { Link } from "react-router-dom";

const LIMIT = 10;
const token = sessionStorage.getItem("godhadmin");

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(
      productionDomain + `user/pagination/api?page=${pageNumber}&limit=${LIMIT}`,
      {
        method: "GET",
        headers: {
          "x-auth-header": token,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setUsers(result.data);
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

  const searchHandler = (e) => {
    if (e.target.value.trim().length <= 0) {
      setPageNumber(1);
      return;
    }
    if (e.key === "Enter") {
      fetch(
        productionDomain +
          `user/search/${e.target.value}?page=${pageNumber}&limit=${LIMIT}`,
        {
          method: "GET",
          headers: {
            "x-auth-header": token,
          },
        }
      )
        .then((res) => res.json())
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
              <Link
                className="my-3 btn btn-outline-primary btn-block"
                to={"/users/print"}
                state={{ data: users }}
              >
                Export
              </Link>
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
    </Sidebar>
  );
};

export default Users;
