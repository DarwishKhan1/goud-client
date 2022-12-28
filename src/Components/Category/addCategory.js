import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import { creatCategory, updateCategory } from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";

class AddCategory extends Form {
  state = {
    loading: false,
    isEditing: false,
    id: null,
    data: {
      name: "",
    },
    errors: {},
  };

  componentDidMount() {
    const { category } = this.props.location.state;
    if (category) {
      const data = { ...this.state.data };
      data.name = category.name;
      this.setState({
        data,
        id: category._id,
        isEditing: true,
      });
    }
  }

  objectSchema = {
    name: Joi.string().empty().required(),
  };

  doSubmit = async () => {
    const { name } = this.state.data;
    try {
      this.setState({ loading: true });
      const reqData = {
        name,
      };

      if (this.state.isEditing) {
        await updateCategory(reqData, this.state.id);
      } else {
        await creatCategory(reqData);
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );
      this.props.navigate("/categories");
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
          <div className="edit__profile_container_vendor">
            <div className="edit__profile_title">
              <h3 className="primary-color">
                {this.state.isEditing ? "Edit Category" : "Add Category"}
              </h3>
            </div>

            <div className="card p-3">
              <Input
                name="name"
                label="Name"
                onChange={this.inputHandler}
                error={errors.name}
                value={data.name}
                type="text"
                placeholder="Enter name "
              />

              <button onClick={this.submitForm} className="btn primary-button">
                Submit
              </button>
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
  return <AddCategory {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
