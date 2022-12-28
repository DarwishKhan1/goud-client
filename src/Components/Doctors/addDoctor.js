import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import {
  createDoctor,
  getCities,
  sendNotification,
  updateDoctor,
} from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain } from "../utils/utils";
import BootstrapModal from "../Common/Modal";
import TextArea from "./../Common/TextArea";
import AutoCompletePlaces from "../Common/AutoCompletePlaces";
import Select from "./../Common/Select";

class AddDoctor extends Form {
  state = {
    loading: true,
    cities: [],
    file: null,
    isEditing: false,
    image: null,
    showModal: false,
    id: null,
    data: {
      name: "",
      address: "",
      aboutMe: "",
      qualification: "",
      city: "",
      experienceInYear: "",
      satisfactionRate: "",
      expertise: "",
      availabilityHours: "",
      availabilityDays: "",
      contact: "",
      lat: 0,
      lang: 0,
    },
    errors: {},
  };

  async componentDidMount() {
    const { doctor } = this.props.location.state;

    if (doctor) {
      const data = { ...this.state.data };
      data.name = doctor.name;
      data.address = doctor.address;
      data.aboutMe = doctor.aboutMe;
      data.qualification = doctor.qualification;
      data.city = doctor.city._id;
      data.experienceInYear = doctor.experienceInYear;
      data.satisfactionRate = doctor.satisfactionRate;
      data.lat = doctor.lat;
      data.lang = doctor.lang;
      data.expertise = doctor.expertise;
      data.availabilityDays = doctor.availabilityDays;
      data.availabilityHours = doctor.availabilityHours;
      data.contact = doctor.contact.toString();

      this.setState({
        data,
        id: doctor._id,
        image: doctor.image,
        time: doctor.time,
        isEditing: true,
      });
    }

    try {
      const cities = await getCities();
      this.setState({ cities });
    } catch (error) {
      alert(error.message);
    }
    this.setState({ loading: false });
  }

  objectSchema = {
    name: Joi.string().empty().required(),
    address: Joi.string().empty().required(),
    aboutMe: Joi.string().empty().required(),
    qualification: Joi.string().empty().required(),
    city: Joi.string().empty().required(),
    experienceInYear: Joi.number(),
    satisfactionRate: Joi.number(),
    availabilityDays: Joi.string().empty().required(),
    expertise: Joi.string().empty().required(),
    availabilityHours: Joi.string().empty().required(),
    contact: Joi.string().empty().required(),
    lat: Joi.number(),
    lang: Joi.number(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  locationHandler = (address) => {
    const cData = { ...this.state.data };
    const errors = { ...this.state.errors };
    cData.address = address.address;
    cData.lat = address.lat;
    cData.lang = address.lng;
    delete errors["address"];
    this.setState({ data: cData, errors });
  };

  notificationHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  doSubmit = async () => {
    const {
      name,
      address,
      city,
      qualification,
      contact,
      lat,
      lang,
      expertise,
      aboutMe,
      experienceInYear,
      satisfactionRate,
      availabilityDays,
      availabilityHours,
    } = this.state.data;
    try {
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("qualification", qualification);
      formData.append("contact", contact);
      formData.append("city", city);
      formData.append("expertise", expertise);
      formData.append("aboutMe", aboutMe);
      formData.append("experienceInYear", experienceInYear);
      formData.append("satisfactionRate", satisfactionRate);
      formData.append("availabilityDays", availabilityDays);
      formData.append("availabilityHours", availabilityHours);
      formData.append("lat", lat);
      formData.append("lang", lang);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        formData.append("image", this.state.image);
        await updateDoctor(formData, this.state.id);
        await sendNotification("Doctor", name + " Doctor is updated!");
      } else {
        await createDoctor(formData);
        await sendNotification("Doctor", name + " Doctor is created!");
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/doctors");

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
                  {this.state.isEditing ? "Edit Doctor" : "Add Doctor"}
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
                  name="name"
                  label="Name"
                  onChange={this.inputHandler}
                  error={errors.name}
                  value={data.name}
                  type="text"
                  placeholder="Enter name "
                />

                <button
                  className="btn primary-button-outline my-2"
                  data-target="#locationmodal"
                  data-toggle="modal"
                >
                  Select Address
                </button>
                {this.state.data.address && (
                  <div>
                    <span>{this.state.data.address}</span>
                    <br />
                  </div>
                )}
                {this.state.errors.address && (
                  <div>
                    <span className="error-message">
                      {this.state.errors.address}
                    </span>
                    <br />
                  </div>
                )}

                <TextArea
                  name="aboutMe"
                  label="About Me"
                  onChange={this.inputHandler}
                  error={errors.aboutMe}
                  value={data.aboutMe}
                  type="text"
                  placeholder="Enter description... "
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

                <Input
                  name="qualification"
                  label="Qualification"
                  onChange={this.inputHandler}
                  error={errors.qualification}
                  value={data.qualification}
                  type="text"
                  placeholder="Enter qualification "
                />
                <Input
                  name="experienceInYear"
                  label="Experience In Year"
                  onChange={this.inputHandler}
                  error={errors.experienceInYear}
                  value={data.experienceInYear}
                  type="number"
                  placeholder="Enter experienceInYear "
                />
                <Input
                  name="satisfactionRate"
                  label="Satisfaction Rate"
                  onChange={this.inputHandler}
                  error={errors.satisfactionRate}
                  value={data.satisfactionRate}
                  type="number"
                  placeholder="Enter satisfactionRate "
                />
                <Input
                  name="expertise"
                  label="Expertise"
                  onChange={this.inputHandler}
                  error={errors.expertise}
                  value={data.expertise}
                  type="text"
                  placeholder="Enter expertise "
                />
                <Input
                  name="contact"
                  label="Contact"
                  onChange={this.inputHandler}
                  error={errors.contact}
                  value={data.contact}
                  type="number"
                  placeholder="Enter contact "
                />
                <Input
                  name="availabilityDays"
                  label="Availabe Days"
                  onChange={this.inputHandler}
                  error={errors.availabilityDays}
                  value={data.availabilityDays}
                  type="text"
                  placeholder="Enter availabilityDays "
                />
                <Input
                  name="availabilityHours"
                  label="Available Hours"
                  onChange={this.inputHandler}
                  error={errors.availabilityHours}
                  value={data.availabilityHours}
                  type="text"
                  placeholder="Enter availabilityHours "
                />

                <button
                  onClick={this.submitForm}
                  data-toggle="modal"
                  data-target="#notificationmodel"
                  className="btn primary-button"
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
  return <AddDoctor {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
