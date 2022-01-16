import React from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {
  return (
    <div className='form-group row'>
      <label className='col-sm-4 col-form-label' htmlFor={name}>{label}</label>
      <div className='col-sm-8'>
        <select
          name={name}
          value={value}
          onChange={onChange}
          className='form-control-sm'>
          {defaultOption && <option value=''>{defaultOption}</option>}
          {options.map(option => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })}
        </select>
        {error && <div className='alert alert-danger'>{error}</div>}
      </div>
    </div>
  );
};

export default SelectInput;
