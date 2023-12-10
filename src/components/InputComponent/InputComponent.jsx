import React from 'react';
import './InputComponent.css';

const InputComponent = ({ label, type, accept }) => {
  return (
    <div>
      <label>{label}</label>
      <input type={type} accept={accept} />
    </div>
  );
};

export default InputComponent;
