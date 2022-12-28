import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getEventCategories, deleteEventCategoryInDb } from "../../APIS/apis";
import CategoriesTable from "./CategoriesTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";

class Categories extends Component {
  state = { loading: true, categories: [], pageOfCategories: [] };

  async componentDidMount() {
    try {
      const categories = await getEventCategories();
      this.setState({ loading: false, categories });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteCategoryHandler = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete it? you have to be careful, this will delete all the records associated with this."
    );
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      await deleteEventCategoryInDb(id);

      let allCategories = [...this.state.categories];
      allCategories = allCategories.filter((itm) => itm._id !== id);
      this.setState({ loading: false, categories: allCategories });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
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
            <h2>Event Categories</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/eventCategories/add"}
              state={{ category: null }}
            >
              Create Category
            </Link>
            <CategoriesTable
              data={this.state.pageOfCategories}
              deleteCategory={this.deleteCategoryHandler}
            />
            <Pagination
              items={this.state.categories}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Categories;
