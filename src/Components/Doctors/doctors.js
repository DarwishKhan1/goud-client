import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { deleteDoctor, getDoctors } from "../../APIS/apis";
import DoctorsTable from "./doctorsTable";
import Spinner from "../Common/Spinner";
import axios from "axios";
import { localDomain } from "../utils/utils";
import { Link } from "react-router-dom";
import Input from "../Common/Input";

class Doctors extends Component {
  state = { loading: true, doctors: [], searchTerm: "" };

  async componentDidMount() {
    try {
      const doctors = await getDoctors();
      this.setState({ loading: false, doctors });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  }

  deleteDoctorHandler = async (id, image) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      this.setState({ loading: true });
      let alldoctors = [...this.state.doctors];
      alldoctors = alldoctors.filter((itm) => itm._id !== id);
      await deleteDoctor(id, image);
      this.setState({ loading: false, doctors: alldoctors });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  statusHandler = async (doctor) => {
    const message = doctor.status
      ? "Are you sure you want to Block doctor?"
      : "Are you sure you want to Unblock doctor?";

    const response = window.confirm(message);
    if (!response) return;

    this.setState({ loading: true });

    const alldoctors = [...this.state.doctors];

    const index = alldoctors.findIndex((item) => item._id === doctor._id);

    alldoctors[index].status = !alldoctors[index].status;

    const token = sessionStorage.getItem("godhadmin");

    const data = {
      status: alldoctors[index].status,
    };

    var config = {
      method: "post",
      url: `${localDomain}doctor/status/${doctor._id}`,
      headers: {
        "x-auth-header": token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      await axios(config);
      this.setState({ loading: false, doctors: alldoctors });
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  };

  inputHandler = (e) => {
    const value = e.target.value;
    this.setState({ searchTerm: value });
  };

  getFilterResults = (doctors) => {

    let filterdoctors = [...doctors];
    const searchvalue = this.state.searchTerm;

    if (searchvalue.trim() !== "") {
      filterdoctors = filterdoctors.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchvalue.trim().toLowerCase()) ||
          user.qualification
            .toLowerCase()
            .includes(searchvalue.trim().toLowerCase())
        );
      });
    }

    return filterdoctors;
  };

  render() {
    let filterdoctors = [...this.state.doctors];
    filterdoctors = this.getFilterResults(filterdoctors);

    return (
      <Sidebar>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            <h2>Doctors</h2>

            <Link
              className="btn btn-outline-primary btn-block"
              to={"/doctors/add"}
              state={{ doctor: null }}
            >
              Create Doctor
            </Link>
            <Input
              name="searchTerm"
              onChange={this.inputHandler}
              type="text"
              placeholder="Search "
            />

            <DoctorsTable
              data={filterdoctors}
              statusHandler={this.statusHandler}
              deleteDoctorHandler={this.deleteDoctorHandler}
            />
          </div>
        )}
      </Sidebar>
    );
  }
}

export default Doctors;
