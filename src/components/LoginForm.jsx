import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/Form";
import { login, getUser } from "../services/AuthService";
import { toast } from "react-toastify";
import { WithRouter } from "../utils/WithRouter";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const {data: response} = await login(data.username, data.password);
      
      if (response.status_code === 200) { 

        localStorage.setItem("access_token", response.access_token);

        const headers = {headers: {
'Authorization': `Bearer ${response.access_token}`
          }
        }
        const {data: user} = await getUser();

        localStorage.setItem("auth_user", JSON.stringify(user));

        toast.success("Logged in.");

        window.location = "/";

      } else {
        const errors = { ...this.state.errors };
        errors.username = response.message;
        this.setState({ errors });
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
