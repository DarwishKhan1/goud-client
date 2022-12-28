import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getSymptoms, deleteSymptomFromDb } from "../../APIS/apis";
import SymptomsTable from "./symptomsTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";

class Weeks extends Component {
  state = { loading: true, symptoms: [], pageOfSymptoms: [] };

  async componentDidMount() {
    try {
      const symptoms = await getSymptoms();
      this.setState({ loading: false, symptoms });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteSymptomHandler = async (id, image) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      let allsymptoms = [...this.state.symptoms];
      allsymptoms = allsymptoms.filter((itm) => itm._id !== id);
      await deleteSymptomFromDb(id, image);
      this.setState({ loading: false, symptoms: allsymptoms });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  onChangePage = (pageOfItems) => {
    this.setState({ pageOfSymptoms: pageOfItems });
  };

  render() {
    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Symptoms Data</h2>
            <Link
              className="btn btn-outline-primary btn-block"
              to={"/symptoms/add"}
              state={{ symptom: null }}
            >
              Create Symptom Data
            </Link>

            <SymptomsTable
              data={this.state.pageOfSymptoms}
              deleteSymptom={this.deleteSymptomHandler}
            />

            <Pagination
              items={this.state.symptoms}
              onChangePage={this.onChangePage}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Weeks;
