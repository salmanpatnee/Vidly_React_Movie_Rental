import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
        <div className="form-group">
            <input
                type="search"
                className='form-control form-control-lg my-3'
                placeholder="Search"
                value={value}
                onChange={e => onChange(e.currentTarget.value)}
            />
        </div>
    )
}

export default SearchBox;