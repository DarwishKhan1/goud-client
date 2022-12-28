import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import { createWeek, sendNotification, updateWeek } from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain } from "../utils/utils";
import HtmlEditor from "../Common/HtmlEditor";
import Modal from "../Common/Modal";
import TextArea from "./../Common/TextArea";

class AddWeek extends Form {
  state = {
    loading: true,
    file: null,
    isEditing: false,
    imageUrl: null,
    id: null,
    data: {
      title: "",
      shortDescription: "",
      longDescription: "",
      babyLenght: "",
      babyWeight: "",
      weekNo: 1,
    },
    errors: {},
  };

  componentDidMount() {
    const { week } = this.props.location.state;
    if (week) {
      const data = { ...this.state.data };
      data.title = week.title;
      data.shortDescription = week.shortDescription;
      data.longDescription = week.longDescription;
      data.babyLenght = week.babyLength;
      data.babyWeight = week.babyWeight;
      data.weekNo = week.weekNo;
      this.setState({
        data,
        id: week._id,
        imageUrl: week.imageUrl,
        isEditing: true,
      });
    }
    this.setState({ loading: false });
  }

  objectSchema = {
    title: Joi.string().empty().required(),
    shortDescription: Joi.string().max(300).empty().required(),
    longDescription: Joi.string().empty().required(),
    babyLenght: Joi.string().empty().required(),
    babyWeight: Joi.string().empty().required(),
    weekNo: Joi.required(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  descriptionHandler = (value) => {
    const { errors, data } = this.state;
    const allErrors = { ...errors };
    const totalData = { ...data };
    if (allErrors["longDescription"]) {
      delete allErrors["longDescription"];
    }
    totalData.longDescription = value;
    this.setState({ errors: allErrors, data: totalData });
  };

  doSubmit = async () => {
    const {
      title,
      shortDescription,
      longDescription,
      babyLenght,
      babyWeight,
      weekNo,
    } = this.state.data;
    try {
      this.setState({ loading: true });

      const formData = new FormData();

      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("longDescription", longDescription);
      formData.append("weekNo", weekNo);
      formData.append("babyLength", babyLenght);
      formData.append("babyWeight", babyWeight);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        formData.append("imageUrl", this.state.imageUrl);
        await updateWeek(formData, this.state.id);
        await sendNotification("Week Data", title + " is Updated!");
      } else {
        await createWeek(formData);
        await sendNotification("Week Data", title + " is created!");
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/weeks");
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
                  {this.state.isEditing ? "Edit Week" : "Add Week"}
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
                    src={
                      this.state.file
                        ? URL.createObjectURL(this.state.file)
                        : this.state.imageUrl
                        ? localDomain + "images/" + this.state.imageUrl
                        : Placeholder
                    }
                    alt=""
                    className="image"
                  ></img>
                </div>
                <Input
                  name="title"
                  label="Title"
                  onChange={this.inputHandler}
                  error={errors.title}
                  value={data.title}
                  type="text"
                  placeholder="Enter Title "
                />

                <TextArea
                  name="shortDescription"
                  label="Short Description"
                  onChange={this.inputHandler}
                  error={errors.shortDescription}
                  value={data.shortDescription}
                  type="text"
                  placeholder="Enter short Description"
                />

          

                <HtmlEditor
                  descriptionHandler={this.descriptionHandler}
                  longDescription={this.state.data.longDescription}
                />
                {this.state.errors.longDescription && (
                  <span className="error-message">
                    {this.state.errors.longDescription}
                  </span>
                )}

                <Input
                  name="babyLenght"
                  label="BabyLength"
                  onChange={this.inputHandler}
                  error={errors.babyLenght}
                  value={data.babyLenght}
                  placeholder="Enter Baby Length"
                />

                <Input
                  name="babyWeight"
                  label="BabyWeigth"
                  onChange={this.inputHandler}
                  error={errors.babyWeight}
                  value={data.babyWeight}
                  placeholder="Enter Baby Weigth"
                />
                <Input
                  name="weekNo"
                  label="Week No"
                  onChange={this.inputHandler}
                  error={errors.weekNo}
                  value={data.weekNo}
                  type="number"
                  placeholder="Enter Week No"
                />

                <button
                  onClick={this.submitForm}
                  className="btn primary-button"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </Sidebar>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return <AddWeek {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
