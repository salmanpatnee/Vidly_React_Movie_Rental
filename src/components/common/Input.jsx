import React from 'react';

const Input = ({ name, label, error, ...rest }) => {
    return (<div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
            {...rest}
            name={name}
            className="form-control"
            id={name} />
        {error && <small className='text-danger'>{error}</small>}
    </div>);
}

Input.defaultProps = {
    type: "text"
};

export default Input;