import React from 'react';
import './InputComponent.css';

const InputComponent = ({ label, type, accept, defaultValue }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} accept={accept} defaultValue={defaultValue}/>
    </div>
  );
};

export default InputComponent;
