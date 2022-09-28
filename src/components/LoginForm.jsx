import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { login } from "../services/AuthService";
import { toast } from "react-toastify";
import { WithRouter } from "../utils/WithRouter";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await login(data.username, data.password);

      if (response.status_code === 200) {
        localStorage.setItem("access_token", response.access_token);
        toast.success("Logged in.");
        this.props.navigate("/movies", { replace: true });
      }
    } catch (error) {
      toast.error("Error while login.");
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-3"></div>
        <div className="col">
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username")}
            {this.renderInput("password", "Password", "password")}
            {this.renderButton()}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default WithRouter(LoginForm);
