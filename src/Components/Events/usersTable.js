import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Spinner from "../Common/Spinner";
import Pagination from "../Common/Pagination";
import { localDomain } from "../utils/utils";
import Table from "../Common/table";
import { useLocation } from "react-router";
import Placeholder from "../../Assets/logoInBlack.png";
import { Link } from "react-router-dom";
import Input from "../Common/Input";

class UsersTable extends Component {
  state = { loading: true, users: [], pageOfUsers: [], searchTerm: "" };

  async componentDidMount() {
    const { users } = this.props.location.state;
    if (users) {
      this.setState({ users, loading: false });
    }
  }

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfUsers: pageOfItems });
  };

  columns = [
    {
      label: "S.No",
      key: "",
      content: (item, i) => <div>{i}</div>,
    },
    {
      label: "Image",
      key: "Image",
      content: (item) => (
        <div>
          <img
            src={
              item.userId && item.userId.image
                ? localDomain + "images/" + item.userId.image
                : Placeholder
            }
            style={{ height: "50px", width: "80px", borderRadius: "5px" }}
          />
        </div>
      ),
    },
    {
      label: "Name",
      key: "Name",
      content: (item) => <span>{item.userId.fullName}</span>,
    },
    {
      label: "Email",
      key: "email",
      content: (item) => <span>{item.userId.email}</span>,
    },
    {
      label: "PhoneNumber",
      key: "PhoneNumber",
      content: (item) => <span>{item.userId.phoneNumber}</span>,
    },
  ];

  searchHandler = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getFilterUsers = (allUsers) => {
    const value = this.state.searchTerm;
    if (value.trim() !== "") {
      allUsers = allUsers.filter((item) => {
        return (
          item.fullName.toLowerCase().includes(value.trim().toLowerCase()) ||
          item.phoneNumber.toLowerCase().includes(value.trim().toLowerCase()) ||
          item.email.toLowerCase().includes(value.trim().toLowerCase())
        );
      });
    }

    return allUsers;
  };

  render() {
    let users = [...this.state.users];

    users = this.getFilterUsers(users);

    let allUsers = [...this.state.users];
    allUsers = allUsers.map((user) => {
      return { ...user.userId };
    });
    console.log(users);

    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Registered Users</h2>
            <Link
              className="my-3 btn btn-outline-primary btn-block"
              to={"/users/print"}
              state={{ data: allUsers }}
            >
              Generate Report
            </Link>

            <Input placeholder="Search by Name" onChange={this.searchHandler} />

            <div className="my-3">
              <Table data={users} coloumns={this.columns} />
            </div>

            <Pagination
              items={this.state.users}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}
function WithNavigate(props) {
  const location = useLocation();
  return <UsersTable {...props} location={location} />;
}

export default WithNavigate;
