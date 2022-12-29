import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Input from "../Common/Input";
import { Form as BForm } from "react-bootstrap";
import Spinner from "../Common/Spinner";
import { creatRole, updateRole } from "../../APIS/apis";
import { useLocation, useNavigate } from "react-router";

class AddRole extends Component {
  state = {
    loading: false,
    isEditing: false,
    id: null,
    data: {
      name: "",
      users: true,
      doctors: true,
      before_pregnancy: true,
      after_pregnancy: true,
      articles_category: true,
      articles: true,
      cities: true,
      common_symptoms: true,
      events: true,
      events_category: true,
      guildines: true,
      onboard_screens: true,
      roles: true,
    },
  };

  componentDidMount() {
    const { role } = this.props.location.state;
    if (role) {
      const data = { ...this.state.data };
      data.name = role.name;
      data.users = role.users;
      data.doctors = role.doctors;
      data.before_pregnancy = role.before_pregnancy;
      data.after_pregnancy = role.after_pregnancy;
      data.articles_category = role.articles_category;
      data.articles = role.articles;
      data.cities = role.cities;
      data.common_symptoms = role.common_symptoms;
      data.events = role.events;
      data.events_category = role.events_category;
      data.guildines = role.guildines;
      data.onboard_screens = role.onboard_screens;
      data.roles = role.roles;
      this.setState({
        data,
        id: role._id,
        isEditing: true,
      });
    }
  }

  doSubmit = async () => {
    const {
      name,
      users,
      doctors,
      before_pregnancy,
      after_pregnancy,
      articles_category,
      articles,
      cities,
      common_symptoms,
      events,
      events_category,
      guildines,
      onboard_screens,
      roles,
    } = this.state.data;
    try {
      if (name.length <= 0) return alert("name is required");
      this.setState({ loading: true });
      const reqData = {
        name,
        users,
        doctors,
        before_pregnancy,
        after_pregnancy,
        articles_category,
        articles,
        cities,
        common_symptoms,
        events,
        events_category,
        guildines,
        onboard_screens,
        roles,
      };

      if (this.state.isEditing) {
        await updateRole(reqData, this.state.id);
      } else {
        await creatRole(reqData);
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

  changeHandler = (e) => {
    const d = { ...this.state.data };
    d[e.target.name] = e.target.checked;
    this.setState({ data: d });
  };
  inputHandler = (e) => {
    const d = { ...this.state.data };
    d[e.target.name] = e.target.value;
    this.setState({ data: d });
  };

  render() {
    const { loading, data } = this.state;
    return (
      <Sidebar>
        {loading ? (
          <Spinner />
        ) : (
          <div className="edit__profile_container_vendor">
            <div className="edit__profile_title">
              <h3 className="primary-color">
                {this.state.isEditing ? "Edit Role" : "Add Role"}
              </h3>
            </div>

            <div className="card p-3">
              <Input
                name="name"
                label="Name"
                onChange={this.inputHandler}
                value={data.name}
                type="text"
                placeholder="Enter name of the role"
              />

              <div className="row">
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Users</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.users}
                      name="users"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Doctors</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.doctors}
                      name="doctors"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Before Pregnancy</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.before_pregnancy}
                      name="before_pregnancy"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>After Pregnancy</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.after_pregnancy}
                      name="after_pregnancy"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Articles Category</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.articles_category}
                      name="articles_category"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Articles</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.articles}
                      name="articles"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Cities</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.cities}
                      name="cities"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Common Symptoms</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.common_symptoms}
                      name="common_symptoms"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Events Category</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.events_category}
                      name="events_category"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Events</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.events}
                      name="events"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Onboard Screens</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.onboard_screens}
                      name="onboard_screens"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Guidlines</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.guildines}
                      name="guildines"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="profileMain_portal">
                    <p>Roles</p>
                    <BForm.Check
                      type="switch"
                      id="custom-switch"
                      checked={data.roles}
                      name="roles"
                      onChange={this.changeHandler}
                    />
                  </div>
                </div>
              </div>

              <button onClick={this.doSubmit} className="btn primary-button">
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
  return <AddRole {...props} location={location} navigate={navigate} />;
}

export default WithNavigate;
