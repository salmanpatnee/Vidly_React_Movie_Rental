import React from "react";

<<<<<<< HEAD
const Dropdown = ({ name, label, items, selectedItem, error, value, text, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} className="form-control"  {...rest}>
                {items.map(item => (
                    <option
                        selected={item[value] === selectedItem}
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
=======
const Dropdown = ({
  name,
  label,
  items,
  selectedItem,
  error,
  value,
  text,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} defaultValue={selectedItem} className="form-control" {...rest}>
        {items.map((item) => (
          <option
            key={item[value]}
            value={item[value]}
          >
            {item[text]}
          </option>
        ))}
      </select>
      {error && <small className="text-danger">{error}</small>}
    </div>
  );
};
>>>>>>> b1d98d786f836130fa43cf49fb4a1494ff6091ea

Dropdown.defaultProps = {
  text: "name",
  value: "_id",
};

export default Dropdown;
