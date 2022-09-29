import React from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { toast } from "react-toastify";
import { register, getUser } from "../services/AuthService";
import { WithRouter } from "../utils/WithRouter";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const {data: response} = await register(this.state.data);
      localStorage.setItem("access_token", response.access_token);

      const headers = {headers: 
        {'Authorization': `Bearer ${response.access_token}`}
      };
      const {data: user} = await getUser(headers);

      localStorage.setItem("auth_user", JSON.stringify(user));

      window.location = "/";

      toast.success(response.message);

    } catch (error) {
      if (error.response && error.response.status === 422) {
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
          <h2>Register</h2>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "email")}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name", "name")}
            {this.renderButton("Register")}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    );
  }
}

export default WithRouter(RegisterForm);
