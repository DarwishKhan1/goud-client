import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getWeeks, deleteWeekFromDb } from "../../APIS/apis";
import WeeksTable from "./weeksTable";
import Spinner from "./../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";

class Weeks extends Component {
  state = { loading: true, weeks: [], pageOfWeeks: [] };

  async componentDidMount() {
    try {
      const weeks = await getWeeks();
      this.setState({ loading: false, weeks });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteWeekHandler = async (id, imageUrl) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      let allWeeks = [...this.state.weeks];
      allWeeks = allWeeks.filter((itm) => itm._id !== id);
      await deleteWeekFromDb(id, imageUrl);
      this.setState({ loading: false, weeks: allWeeks });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfWeeks: pageOfItems });
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Weeks Data</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/weeks/add"}
              state={{ week: null }}
            >
              Create Week Data
            </Link>
            <WeeksTable
              data={this.state.pageOfWeeks}
              deleteWeek={this.deleteWeekHandler}
            />
            <Pagination
              items={this.state.weeks}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Weeks;
