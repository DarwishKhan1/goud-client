import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Input from "../Common/Input";
import Form from "../Common/Form";
import Joi from "joi";
import Spinner from "../Common/Spinner";
import { createMangementUser, updateMangementUserRole } from "../../APIS/apis";
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
    },
    password: "",
    errors: {},
  };

  async componentDidMount() {
    const { user, roles } = this.props.location.state;
    if (user) {
      const data = { ...this.state.data };
      data.name = user.name;
      data.email = user.email;
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
    role: Joi.string().empty().required(),
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  doSubmit = async () => {
    const { name, email, password, role } = this.state.data;
    try {
      this.setState({ loading: true });

      const formData = new FormData();
      formData.append("name", name);
      formData.append("role", role);

      if (this.state.isEditing) {
        await updateMangementUserRole(formData, this.state.id);
      } else {
        if (password.length <= 0) return alert("password is required");
        formData.append("email", email);
        formData.append("password", password);
        await createMangementUser(formData);
      }
      alert(
        this.state.isEditing
          ? "Updated successfully!!"
          : "Created successfully!!"
      );

      this.props.navigate("/roles");

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
                {!this.state.isEditing && (
                  <Input
                    name="password"
                    label="Password"
                    onChange={this.changeHandler}
                    type="password"
                    placeholder="Enter password "
                  />
                )}

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
  return (
    <AddManagementUser {...props} location={location} navigate={navigate} />
  );
}

export default WithNavigate;
