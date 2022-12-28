import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import {
  createUser,
  getCities,
  sendNotification,
  updateUser,
} from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain } from "../utils/utils";
import BootstrapModal from "../Common/Modal";
import AutoCompletePlaces from "../Common/AutoCompletePlaces";
import Select from "./../Common/Select";

const GENDERS = [
  { id: 1, name: "Male" },
  { id: 2, name: "Female" },
];
class AddUser extends Form {
  state = {
    loading: true,
    cities: [],
    file: null,
    isEditing: false,
    image: null,
    showModal: false,
    id: null,
    data: {
      fullName: "",
      phoneNumber: "",
      gender: "",
      email: "",
      city: "",
      dob: "",
      country: "",
      lastMenstrualPeriod: "",
      isPregnant: false,
      password: "",
      lat: 0,
      lang: 0,
    },
    errors: {},
  };

  async componentDidMount() {
    const { user } = this.props.location.state;

    if (user) {
      const data = { ...this.state.data };
      data.fullName = user.fullName;
      data.email = user.email;
      data.gender = user.gender;
      data.dob = user.dob;
      data.city = user.city._id;
      data.country = user.country;
      data.isPregnant = user.isPregnant;
      data.lat = user.lat;
      data.lang = user.lang;
      data.lastMenstrualPeriod = user.lastMenstrualPeriod;
      data.password = user.password;
      data.phoneNumber = user.phoneNumber;

      this.setState({
        data,
        id: user._id,
        image: user.image,
        isEditing: true,
      });
    }

    try {
      const cities = await getCities();
      console.log(cities);
      this.setState({ cities, loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  objectSchema = {
    fullName: Joi.string().empty().required(),
    phoneNumber: Joi.string().empty().required(),
    email: Joi.string().empty().required(),
    gender: Joi.string().empty().required(),
    city: Joi.string().empty().required(),
    country: Joi.string().empty().required(),
    dob: Joi.string().empty().required(),
    password: Joi.string().empty().required(),
    lastMenstrualPeriod: Joi.string().empty().required(),
    isPregnant: Joi.boolean().required(),
    lat: Joi.number(),
    lang: Joi.number(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  locationHandler = (address) => {
    const cData = { ...this.state.data };
    const errors = { ...this.state.errors };
    cData.lat = address.lat;
    cData.lang = address.lng;
    this.setState({ data: cData, errors });
  };

  notificationHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeHandler = (e) => {
    const d = { ...this.state.data };
    d[e.target.name] = e.target.checked;
    this.setState({ data: d });
  };

  doSubmit = async () => {
    const {
      fullName,
      phoneNumber,
      email,
      isPregnant,
      gender,
      city,
      dob,
      country,
      lat,
      lang,
      lastMenstrualPeriod,
      password,
    } = this.state.data;
    try {
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("isPregnant", isPregnant);
      formData.append("city", city);
      formData.append("gender", gender);
      formData.append("dob", dob);
      formData.append("country", country);
      formData.append("lastMenstrualPeriod", lastMenstrualPeriod);
      formData.append("password", password);
      formData.append("lat", lat);
      formData.append("lang", lang);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        formData.append("image", this.state.image);
        await updateUser(formData, this.state.id);
        await sendNotification("User", fullName + " Doctor is updated!");
      } else {
        await createUser(formData);
        await sendNotification("User", fullName + " Doctor is created!");
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/users");

      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  };

  render() {
    const { errors, loading, data } = this.state;

    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="edit__profile_container_vendor">
              <div className="edit__profile_title">
                <h3 className="primary-color heading3">
                  {this.state.isEditing ? "Edit User" : "Add User"}
                </h3>
              </div>

              <div className="card p-3">
                <div className="vendor__profile_img mb-3">
                  <div className="image-upload">
                    <label htmlFor="file-input" className="label">
                      <FaEdit />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      name="file"
                      accept="image/*"
                      onChange={this.fileInputHandler}
                    />
                  </div>
                  <img
                    className="image"
                    src={
                      this.state.file
                        ? URL.createObjectURL(this.state.file)
                        : this.state.image
                        ? localDomain + "images/" + this.state.image
                        : Placeholder
                    }
                    alt=""
                  ></img>
                </div>

                <Input
                  name="fullName"
                  label="Full Name"
                  onChange={this.inputHandler}
                  error={errors.fullName}
                  value={data.fullName}
                  type="text"
                  placeholder="Enter fullName "
                />
                <Input
                  name="phoneNumber"
                  label="Phone Number"
                  onChange={this.inputHandler}
                  error={errors.phoneNumber}
                  value={data.phoneNumber}
                  type="text"
                  placeholder="Enter phoneNumber "
                />
                <Input
                  name="email"
                  label="Email"
                  onChange={this.inputHandler}
                  error={errors.email}
                  value={data.email}
                  type="email"
                  placeholder="Enter email "
                />
                <Input
                  name="dob"
                  label="Date of Birth"
                  onChange={this.inputHandler}
                  error={errors.dob}
                  value={data.dob}
                  type="date"
                  placeholder="Enter date of birth "
                />
                <Input
                  name="lastMenstrualPeriod"
                  label="Last Mentrual Period"
                  onChange={this.inputHandler}
                  error={errors.lastMenstrualPeriod}
                  value={data.lastMenstrualPeriod}
                  type="date"
                  placeholder="Enter last Menstrual Period Date"
                />
                <Input
                  name="country"
                  label="country"
                  onChange={this.inputHandler}
                  error={errors.country}
                  value={data.country}
                  type="text"
                  placeholder="Enter country "
                />
                <Select
                  name="city"
                  label="City"
                  data={this.state.cities}
                  searchValue="name"
                  searchKey="_id"
                  onChange={this.inputHandler}
                  error={this.state.errors.city}
                  value={this.state.data.city}
                />

                <div className="form-check">
                  <input
                    type="checkbox"
                    id="isPregnant"
                    name="isPregnant"
                    className="form-check-input"
                    checked={this.state.data.isPregnant}
                    onChange={this.changeHandler}
                  />
                  <label
                    htmlFor="isPregnant"
                    className="font-weight-bold form-check-label"
                  >
                    Is Pregnent
                  </label>
                </div>

                <button
                  className="btn primary-button-outline my-2"
                  data-target="#locationmodal"
                  data-toggle="modal"
                >
                  Select Location
                </button>

                {this.state.data.lat === 0 && (
                  <div>
                    <span className="error-message">Location is required</span>
                    <br />
                  </div>
                )}

                <Select
                  name="gender"
                  label="Gender"
                  data={GENDERS}
                  searchValue="name"
                  searchKey="name"
                  onChange={this.inputHandler}
                  error={this.state.errors.gender}
                  value={this.state.data.gender}
                />

                <Input
                  name="password"
                  label="Password"
                  onChange={this.inputHandler}
                  error={errors.password}
                  value={data.password}
                  type="password"
                  placeholder="Enter password "
                />

                <button
                  onClick={this.submitForm}
                  data-toggle="modal"
                  data-target="#notificationmodel"
                  className="btn primary-button"
                  disabled={this.state.isEditing}
                >
                  Submit
                </button>
              </div>
            </div>
            <BootstrapModal
              id="locationmodal"
              label="Select Location"
              modalsize="modal-xl"
              showCloseBtn={true}
            >
              <AutoCompletePlaces selectedLocation={this.locationHandler} />
            </BootstrapModal>
          </div>
        )}
      </Sidebar>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <AddUser {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
