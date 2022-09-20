import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Dropdown from './Dropdown';

class Form extends Component {

    state = {
        data: {},
        errors: {}
    }

    validate = () => {

        const options = { abortEarly: false };

        const { error } = Joi.validate(this.state.data, this.schema, options);

        if (!error) return null;

        const errors = {};

        for (let item of error.details) errors[item.path[0]] = item.message;

        return errors;
    }

    validateProperty = ({ name, value }) => {

        const property = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(property, schema);

        return error ? error.details[0].message : null;
    }

    handleChange = ({ currentTarget: input }) => {

        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };

        data[input.name] = input.value;
        this.setState({ data, errors });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (errors) return;

        this.doSubmit();
    }

    renderInput = (name, label, type = 'text') => {
        const { data, errors } = this.state;
        return (
            <Input
                type={type}
                name={name}
                label={label}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
            />
        )
    }

    renderDropdown = (name, label, items, selectedItem, text = "name", value = "_id") => {
        const { errors } = this.state;

        return (
            <Dropdown
                name={name}
                label={label}
                items={items}
                selectedItem={selectedItem}
                text={text}
                value={value}
                error={errors[name]}
                onChange={this.handleChange}
            />
        )
    }

    renderButton = (label = "Submit") => {
        return (<button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary">
            {label}
        </button>)
    }
}

export default Form;