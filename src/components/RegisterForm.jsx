import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/Form';

class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {}
    }

    schema = {
        username: Joi.string().email().required().label('Username'),
        password: Joi.string().min(5).required().label('Password'),
        name: Joi.string().required().label('Name'),
    };

    doSubmit = () => {
        console.log('Submitted');
    }

    render() {

        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col">
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit}>
                        {this.renderInput('username', 'Username', 'email')}
                        {this.renderInput('password', 'Password', 'password')}
                        {this.renderInput('name', 'Name', 'name')}
                        {this.renderButton('Register')}
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default RegisterForm;