import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { deleteRoleInDb, getRoles } from "../../APIS/apis";
import RolesTable from "./rolesTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";

class Roles extends Component {
  state = { loading: true, roles: [], pageOfroles: [] };

  async componentDidMount() {
    try {
      const roles = await getRoles();
      this.setState({ loading: false, roles });
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

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
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
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Roles;
