import React, { Component } from "react";
import { Link } from "react-router-dom";
import { resetpassword } from "../../APIS/apis";
import Input from "./../Common/Input";

class ForgotPasswordReset extends Component {
  state = {
    email: "",
    oldPassword: "",
    password: "",
    passwordconfirm: "",
  };

  inputHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async () => {
    try {
      const { password, passwordconfirm, oldPassword, email } = this.state;
      if (
        password.trim() === "" ||
        passwordconfirm.trim() === "" ||
        oldPassword === "" ||
        email.trim() === ""
      )
        return alert("All fields are required.");
      if (password !== passwordconfirm) return alert("Password do not match.");
      try {
        await resetpassword(email, oldPassword, password);
        alert("Your password reset successfully, Please Visit login Page.");
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="card p-5" style={{ width: "50%" }}>
          <h3 className="mb-3">Password Reset</h3>
          <Input
            name="email"
            type="email"
            onChange={this.inputHandler}
            label="Email"
            placeholder="Enter admin email"
          />
          <Input
            name="oldPassword"
            type="password"
            onChange={this.inputHandler}
            label="Old Password"
            placeholder="Enter your Old password"
          />
          <Input
            name="password"
            type="password"
            onChange={this.inputHandler}
            label="New Password"
            placeholder="Enter your password"
          />
          <Input
            name="passwordconfirm"
            type="password"
            onChange={this.inputHandler}
            label="Confirm Password"
            placeholder="confirm your password"
          />
          <button className="btn btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>

          <Link
            to="/admin"
            style={{
              color: "blue",
              fontSize: "16px",
              marginTop: "20px",
              textDecoration: "underline",
            }}
          >
            Signin
          </Link>
        </div>
      </div>
    );
  }
}

export default ForgotPasswordReset;
