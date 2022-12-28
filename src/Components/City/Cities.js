import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getCities, deleteCityInDb } from "../../APIS/apis";
import CitiesTable from "./CitiesTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";
import Input from "../Common/Input";

class Categories extends Component {
  state = { loading: true, cities: [], pageOfCities: [], searchTerm: "" };

  async componentDidMount() {
    try {
      const cities = await getCities();
      this.setState({ loading: false, cities });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteCityHandler = async (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete it?"
    );
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      await deleteCityInDb(id);
      let allCities = [...this.state.cities];
      allCities = allCities.filter((itm) => itm._id !== id);
      this.setState({ loading: false, cities: allCities });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfCities: pageOfItems });
  };
  searchHandler = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getFilterUsers = (cities) => {
    const value = this.state.searchTerm;
    if (value.trim() !== "") {
      cities = cities.filter((item) => {
        return item.name.toLowerCase().includes(value.trim().toLowerCase());
      });
    }
    return cities;
  };

  render() {
    let cities = [...this.state.cities];
    cities = this.getFilterUsers(cities);

    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Cities</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/cities/add"}
              state={{ city: null }}
            >
              Create City
            </Link>

            <Input placeholder="Search" onChange={this.searchHandler} />

            <CitiesTable
              data={cities}
              deleteCategory={this.deleteCityHandler}
            />
            <Pagination
              items={this.state.cities}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Categories;
