import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import {
  createGuidline,
  sendNotification,
  updateGuidline,
} from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain } from "../utils/utils";
import TextArea from "../Common/TextArea";
import HtmlEditor from "../Common/HtmlEditor";

class AddGuidline extends Form {
  state = {
    loading: true,
    file: null,
    isEditing: false,
    image: null,
    id: null,
    data: {
      title: "",
      description: "",
      isBeforePregnancy: false,
    },
    errors: {},
  };

  async componentDidMount() {
    const { guidline } = this.props.location.state;
    if (guidline) {
      const data = { ...this.state.data };
      data.title = guidline.title;
      data.description = guidline.description;
      data.isBeforePregnancy = guidline.isBeforePregnancy;
      this.setState({
        data,
        id: guidline._id,
        image: guidline.image,
        isEditing: true,
      });
    }

    this.setState({ loading: false });
  }

  objectSchema = {
    title: Joi.string().empty().required(),
    description: Joi.string().empty().required(),
    isBeforePregnancy: Joi.boolean(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  handleRadio = (key, e) => {
    if (key === "after") {
      if (e.target.checked) {
        const data = { ...this.state.data };
        data.isBeforePregnancy = false;
        this.setState({ data });
      } else {
        const data = { ...this.state.data };
        data.isBeforePregnancy = true;
        this.setState({ data });
      }
    } else {
      if (e.target.checked) {
        const data = { ...this.state.data };
        data.isBeforePregnancy = true;
        this.setState({ data });
      } else {
        const data = { ...this.state.data };
        data.isBeforePregnancy = false;
        this.setState({ data });
      }
    }
  };

  descriptionHandler = (value) => {
    const { errors, data } = this.state;
    const allErrors = { ...errors };
    const totalData = { ...data };
    if (allErrors["description"]) {
      delete allErrors["description"];
    }
    totalData.description = value;
    this.setState({ errors: allErrors, data: totalData });
  };

  doSubmit = async () => {
    const { title, description, isBeforePregnancy } = this.state.data;
    try {
   
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("isBeforePregnancy", isBeforePregnancy);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        formData.append("image", this.state.image);
        await updateGuidline(formData, this.state.id);
        await sendNotification("Guideline", title + " is Updated!");
      } else {
        await createGuidline(formData);
        await sendNotification("Guideline", title + " is created!");
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/guidlines");

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
                  {this.state.isEditing ? "Edit Guideline " : "Add Guideline"}
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
                        : this.state.image
                        ? localDomain +  "images/" +this.state.image
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

                <HtmlEditor
                  descriptionHandler={this.descriptionHandler}
                  longDescription={this.state.data.description}
                />
                {this.state.errors.description && (
                  <span className="error-message">
                    {this.state.errors.description}
                  </span>
                )}

                {/* <div className="mb-3">
                  <div className="custom-control custom-switch">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="guidlineafterbefore"
                      checked={this.state.data.isBeforePregnancy}
                      onChange={this.handleRadio}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={"guidlineafterbefore"}
                    >
                      After Pregnancy / Before Pregnancy
                    </label>
                  </div>
                </div> */}

                {/* <div class="form-check my-2 form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="afterpregnancy"
                    value="After Pregnancy"
                    onChange={(e) => this.handleRadio("after", e)}
                    checked={this.state.data.isBeforePregnancy ? false : true}
                  />
                  <label class="form-check-label" for="afterpregnancy">
                    After Pregnancy
                  </label>
                </div>

                <div class="form-check form-check-inline my-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="beforepregnancy"
                    value="Before Pregnancy"
                    onChange={(e) => this.handleRadio("before", e)}
                    checked={this.state.data.isBeforePregnancy}
                  />
                  <label class="form-check-label" for="beforepregnancy">
                    Before Pregnancy
                  </label>
                </div> */}

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
  return <AddGuidline {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
