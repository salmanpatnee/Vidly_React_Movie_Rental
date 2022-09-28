import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { login } from "../services/AuthService";

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
      const { data: response } = await login(data.username, data.password);

      if (response.status_code === 401) {
        const errors = { ...this.state.errors };
        errors.username = response.message;
        this.setState({ errors });
      } else if (response.status_code === 500) {
        const errors = { ...this.state.errors };
        errors.username = response.message;
        this.setState({ errors });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 500) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data.message;
        this.setState({ errors });
      }
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

export default LoginForm;
