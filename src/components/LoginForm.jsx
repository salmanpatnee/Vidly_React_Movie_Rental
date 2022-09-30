import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import auth from "../services/AuthService";
import { toast } from "react-toastify";
import { WithRouter } from "../utils/WithRouter";
import { useLocation } from 'react-router-dom';

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  componentDidMount() {
    console.log(this.props);

  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);

      toast.success("Logged in.");

      window.location = "/";
    } catch (error) {
      // const errors = { ...this.state.errors };
      // errors.username = response.message;
      // this.setState({ errors });
      toast.error(error.response.data.message);
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
