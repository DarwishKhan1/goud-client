import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getGuidlines, deleteGuidlineFromDb } from "../../APIS/apis";
import GuidlinesTable from "./guidlinesTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";

class Weeks extends Component {
  state = { loading: true, guidlines: [] };

  async componentDidMount() {
    try {
      const guidlines = await getGuidlines();
      this.setState({ loading: false, guidlines });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteGuidlineHandler = async (id, image) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      let allguidlines = [...this.state.guidlines];
      allguidlines = allguidlines.filter((itm) => itm._id !== id);
      await deleteGuidlineFromDb(id, image);
      this.setState({ loading: false, guidlines: allguidlines });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Guidelines Data</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/guidlines/add"}
              state={{ guidline: null }}
            >
              Create Guideline
            </Link>

            <GuidlinesTable
              data={this.state.guidlines}
              deleteGuidline={this.deleteGuidlineHandler}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Weeks;
