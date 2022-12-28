import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getScreens, deleteScreenFromDb } from "../../APIS/apis";
import ScreensTable from "./screensTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";

class OnBoardScreens extends Component {
  state = { loading: true, screens: [], pageOfCategories: [] };

  async componentDidMount() {
    try {
      const screens = await getScreens();
      this.setState({ loading: false, screens });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteScreenHandler = async (id, image) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      let allscreens = [...this.state.screens];
      allscreens = allscreens.filter((itm) => itm._id !== id);
      await deleteScreenFromDb(id, image);
      this.setState({ loading: false, screens: allscreens });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  onChangePage = (pageOfItems) => {
    // update state with new page of items
    this.setState({ pageOfCategories: pageOfItems });
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>OnBoarding Screens</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/onboardscreendata/add"}
              state={{ screen: null }}
            >
              Create Screen
            </Link>
            <ScreensTable
              data={this.state.pageOfCategories}
              deleteScreen={this.deleteScreenHandler}
            />
            <Pagination
              items={this.state.screens}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default OnBoardScreens;
