import React, { Component } from 'react';
import Input from './common/Input';

class LoginForm extends Component {
    state = {
        account: { username: "", password: "" },
        errors: {}
    }

    validate = () => {
        const errors = {};
        const { account } = this.state;

        if (account.username.trim() === '')
            errors.username = "Username is required.";

        if (account.password.trim() === '')
            errors.password = "Password is required.";

        return Object.keys(errors).length === 0 ? null : errors;
    }

    validateProperty = ({ name, value }) => {
        if (name === 'username')
            if (value.trim() === '') return 'Username is required.'
        if (name === 'password')
            if (value.trim() === '') return 'Password is required.'
    }

    handleChange = ({ currentTarget: input }) => {

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };

        account[input.name] = input.value;
        this.setState({ account, errors });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (errors) return;

        console.log('Submitted');
    }

    render() {
        const { account, errors } = this.state;
        return (
            <div className="row">
                <div className="col-3"></div>
                <div className="col">
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            name="username"
                            label="Username"
                            value={account.username}
                            error={errors.username}
                            onChange={this.handleChange}
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            error={errors.password}
                            value={account.password}
                            onChange={this.handleChange}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
        );
    }
}

export default LoginForm;