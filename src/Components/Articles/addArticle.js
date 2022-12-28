import React from "react";
import { FaEdit } from "react-icons/fa";
import Sidebar from "../Sidebar/Sidebar";
import Placeholder from "../../Assets/placeholder.png";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import {
  createArticle,
  getCategories,
  sendNotification,
  updateArticle,
} from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import { localDomain } from "../utils/utils";
import Select from "../Common/Select";
import HtmlEditor from "../Common/HtmlEditor";

class AddArticle extends Form {
  state = {
    loading: true,
    file: null,
    isEditing: false,
    image: null,
    id: null,
    data: {
      title: "",
      categoryId: "",
    },
    description: "",
    referalLink: "",
    categories: [],
    errors: {},
  };

  async componentDidMount() {
    const { article } = this.props.location.state;
    if (article) {
      const data = { ...this.state.data };
      data.title = article.title;
      data.categoryId = article.categoryId ? article.categoryId._id : "";
      this.setState({
        data,
        id: article._id,
        image: article.url,
        referalLink: article.referalLink,
        description: article.description,
        isEditing: true,
      });
    }

    try {
      const categories = await getCategories();
      this.setState({ categories });
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      alert(error.message);
    }
  }

  objectSchema = {
    title: Joi.string().empty().required(),
    categoryId: Joi.string().empty().required(),
  };

  fileInputHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  inputHandler1 = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  descriptionHandler = (e) => {
    this.setState({ description: e });
  };

  doSubmit = async () => {
    const { title, categoryId } = this.state.data;
    const { description, referalLink } = this.state;
    try {
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categoryId", categoryId);
      formData.append("referalLink", referalLink);
      formData.append("file", this.state.file);

      if (this.state.isEditing) {
        formData.append("url", this.state.image);
        await updateArticle(formData, this.state.id);
        await sendNotification("Article", title + " is Updated!");
      } else {
        await createArticle(formData);
        await sendNotification("Article", title + " is created!");
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/articles");

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
                  {this.state.isEditing ? "Edit Article" : "Add Article"}
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
                  name="title"
                  label="Title"
                  onChange={this.inputHandler}
                  error={errors.title}
                  value={data.title}
                  type="text"
                  placeholder="Enter Title "
                />
                <Input
                  name="referalLink"
                  label="Referal Link"
                  onChange={this.inputHandler1}
                  type="text"
                  value={this.state.referalLink}
                  placeholder="Enter Referal Link "
                />

              
                <HtmlEditor
                  descriptionHandler={this.descriptionHandler}
                  longDescription={this.state.description}
                />
           

                <Select
                  name="categoryId"
                  searchKey="_id"
                  value={this.state.data.categoryId}
                  searchValue="name"
                  error={this.state.errors.categoryId}
                  data={this.state.categories}
                  onChange={this.inputHandler}
                  label="Select Category"
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
  return <AddArticle {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
