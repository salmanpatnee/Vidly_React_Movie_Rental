import React from 'react';

const Input = ({ type, name, label, value, error, onChange }) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            value={value}
            onChange={onChange}
            name={name}
            type={type}
            className="form-control"
            id={name} />
        {error && <small className='text-danger'>{error}</small>}
    </div>);
}

Input.defaultProps = {
    type: "text"
};

export default Input;