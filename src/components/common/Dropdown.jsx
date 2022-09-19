import React from 'react';

const Dropdown = ({ name, label, items, error, value, text, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} className="form-control"  {...rest}>
                {items.map(item => (
                    <option
                        key={item[value]}
                        value={item[value]}>
                        {item[text]}
                    </option>
                ))}
            </select>
            {error && <small className='text-danger'>{error}</small>}
        </div>
    );
}

Dropdown.defaultProps = {
    text: "name",
    value: "_id"
};

export default Dropdown;