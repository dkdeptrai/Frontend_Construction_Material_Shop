import React from "react";
import "./password.css";

const Password = () => {
  return (
    <div className="password">
      <label>Name</label>
      <input type="text" />
      <label>Employee Code</label>
      <input type="text" />
      <label>Email</label>
      <input type="email" />
      <button>Submit</button>
    </div>
  );
};

export default Password;
