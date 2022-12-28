import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import { addScreen, updateScreen } from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain } from "../utils/utils";
import TextArea from "../Common/TextArea";

class AddScreenData extends Form {
  state = {
    loading: true,
    file: null,
    isEditing: false,
    image: null,
    id: null,
    data: {
      title: "",
      description: "",
    },
    errors: {},
  };

  componentDidMount() {
    const { screen } = this.props.location.state;
    if (screen) {
      const data = { ...this.state.data };
      data.title = screen.title;
      data.description = screen.description;
      this.setState({
        data,
        id: screen._id,
        image: screen.image,
        isEditing: true,
      });
    }
    this.setState({ loading: false });
  }

  objectSchema = {
    title: Joi.string().empty().required(),
    description: Joi.string().empty().required(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  doSubmit = async () => {
    const { title, description } = this.state.data;
    try {
      this.setState({ loading: true });

      if (!this.state.file && !this.state.isEditing) {
        this.setState({ loading: false });
        return alert("Please select image");
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        formData.append("image", this.state.image);
        await updateScreen(formData, this.state.id);
      } else {
        await addScreen(formData);
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/onboardscreendata");
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
                  {this.state.isEditing ? "Edit Screen" : "Add Screen"}
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
                      accept="image/png"
                      onChange={this.fileInputHandler}
                    />
                  </div>
                  <img
                    src={
                      this.state.file
                        ? URL.createObjectURL(this.state.file)
                        : this.state.image
                        ? localDomain + "images/" + this.state.image
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
                  name="description"
                  label="Description"
                  onChange={this.inputHandler}
                  error={errors.description}
                  value={data.description}
                  type="text"
                  placeholder="Enter Description..."
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
  return <AddScreenData {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
