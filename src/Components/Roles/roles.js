import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { deleteRoleInDb, getManagementUsers, getRoles } from "../../APIS/apis";
import RolesTable from "./rolesTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import { Tab, Tabs } from "react-bootstrap";
import UsersTable from "./usersTable";

class Roles extends Component {
  state = {
    loading: true,
    users: [],
    pageOfusers: [],
    roles: [],
    pageOfroles: [],
    status: "users",
  };

  async componentDidMount() {
    try {
      const roles = await getRoles();
      const users = await getManagementUsers();

      this.setState({ loading: false, roles, users });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  deleteRoleHandler = async (id) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      await deleteRoleInDb(id);
      let allroles = [...this.state.roles];
      allroles = allroles.filter((itm) => itm._id !== id);
      this.setState({ loading: false, roles: allroles });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfroles: pageOfItems });
  };

  selectStatus = (s) => {
    this.setState({ status: s });
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="login-tabs">
              <Tabs
                activeKey={this.state.status}
                id="uncontrolled-tab-example"
                onSelect={(k) => this.selectStatus(k)}
              >
                <Tab
                  eventKey="users"
                  title={
                    <span className="d-flex justify-content-center  align-items-center">
                      Users
                    </span>
                  }
                ></Tab>
                <Tab
                  eventKey="roles"
                  title={
                    <span className="d-flex justify-content-center  align-items-center">
                      Roles
                    </span>
                  }
                ></Tab>
              </Tabs>
            </div>
            {this.state.status === "users" && (
              <>
                <h2>Management Users</h2>
                <Link
                  className="btn btn-outline-primary btn-block"
                  to={"/managmentuser/add"}
                  state={{ user: null, roles: this.state.roles }}
                >
                  Create Management User
                </Link>
                <UsersTable data={this.state.users} />
              </>
            )}
            {this.state.status === "roles" && (
              <>
                <h2>Roles</h2>
                <Link
                  className="btn btn-outline-primary btn-block"
                  to={"/roles/add"}
                  state={{ role: null }}
                >
                  Create role
                </Link>
                <RolesTable
                  data={this.state.pageOfroles}
                  deleteRole={this.deleteRoleHandler}
                />
                <Pagination
                  items={this.state.roles}
                  onChangePage={this.onChangePage}
                />
              </>
            )}
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Roles;
