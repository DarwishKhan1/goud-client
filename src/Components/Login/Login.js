import React from "react";
import { loginAdmin, loginUser } from "../../APIS/apis";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./../Common/Spinner";
import "./Login.css";
import { Tab, Tabs } from "react-bootstrap";

class Login extends React.Component {
  state = {
    loading: false,
    email: "",
    password: "",
    status: "superadmin",
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if ((email.trim() === "", password.trim() === "")) {
      alert("All Fields are required");
      return;
    }

    this.setState({ loading: true });
    try {
      let res;
      if (this.state.status === "superadmin") {
        res = await loginAdmin(email, password);
      } else {
        res = await loginUser(email, password);
      }
      this.setState({ loading: false });
      if (res) {
        this.props.navigate("/dashboard");
      }
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
      alert(error.message);
    }
  };

  selectStatus = (s) => {
    this.setState({ status: s });
  };

  render() {
    return this.state.loading ? (
      <Spinner />
    ) : (
      <div className="loginContainer">
        <div className="frame">
          <div className="login-tabs">
            <Tabs
              activeKey={this.state.status}
              id="uncontrolled-tab-example"
              onSelect={(k) => this.selectStatus(k)}
            >
              <Tab
                eventKey="superadmin"
                title={
                  <span className="d-flex justify-content-center  align-items-center">
                    Super Admin
                  </span>
                }
              ></Tab>
              <Tab
                eventKey="admin"
                title={
                  <span className="d-flex justify-content-center  align-items-center">
                    Admin
                  </span>
                }
              ></Tab>
            </Tabs>
          </div>

          <div className="ct">
            <h2 className="d-flex justify-content-center text-white mt-3">
              Login
            </h2>
            <form className="form-signin" onSubmit={this.login}>
              <label htmlFor="email">Email</label>
              <input
                className="form-styling"
                type="email"
                name="email"
                placeholder=""
                onChange={this.changeHandler}
              />
              <label htmlFor="password">Password</label>
              <input
                className="form-styling"
                type="password"
                name="password"
                onChange={this.changeHandler}
                placeholder=""
              />

              <button className="btn-animate" type="submit">
                <a className="btn-signin">Sign in</a>
              </button>
              <Link
                to="/resetpassword"
                style={{
                  color: "#fff",
                  fontSize: "13px",
                  cursor: "pointer",
                  marginTop: "30px",
                }}
              >
                Forgot your password?
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
