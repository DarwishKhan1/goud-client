import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import {
  createMangementUser,
  sendNotification,
  updateMangementUser,
} from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";
import Select from "../Common/Select";

class AddManagementUser extends Form {
  state = {
    loading: true,
    isEditing: false,
    id: null,
    roles: [],
    data: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const { user, roles } = this.props.location.state;
    if (user) {
      const data = { ...this.state.data };
      data.name = user.name;
      data.email = user.email;
      data.password = user.password;
      data.role = user.role;

      this.setState({
        data,
        id: user._id,
        isEditing: true,
      });
    }
    this.setState({ loading: false, roles });
  }

  objectSchema = {
    name: Joi.string().empty().required(),
    email: Joi.string().empty().required(),
    password: Joi.string().empty().required(),
    role: Joi.string().empty().required(),
  };

  doSubmit = async () => {
    const { name, email, password, role } = this.state.data;
    try {
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);
      formData.append("email", email);
      formData.append("password", password);

      if (this.state.isEditing) {
        await updateMangementUser(formData, this.state.id);
        await sendNotification("User", name + " is updated!");
      } else {
        await createMangementUser(formData);
        await sendNotification("User", name + " is created!");
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
                <Input
                  name="name"
                  label="Full Name"
                  onChange={this.inputHandler}
                  error={errors.name}
                  value={data.name}
                  disabled={this.state.isEditing}
                  type="text"
                  placeholder="Enter name "
                />

                <Input
                  name="email"
                  label="Email"
                  disabled={this.state.isEditing}
                  onChange={this.inputHandler}
                  error={errors.email}
                  value={data.email}
                  type="email"
                  placeholder="Enter email "
                />
                <Select
                  name="role"
                  label="role"
                  data={this.state.roles}
                  searchValue="name"
                  searchKey="_id"
                  onChange={this.inputHandler}
                  error={this.state.errors.role}
                  value={this.state.data.role}
                />
                {this.state.isEditing && (
                  <Input
                    name="password"
                    label="Password"
                    onChange={this.inputHandler}
                    error={errors.password}
                    value={data.password}
                    type="password"
                    placeholder="Enter password "
                  />
                )}

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
          </div>
        )}
      </Sidebar>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  const location = useLocation();
  return (
    <AddManagementUser {...props} location={location} navigate={navigate} />
  );
}

export default WithNavigate;
