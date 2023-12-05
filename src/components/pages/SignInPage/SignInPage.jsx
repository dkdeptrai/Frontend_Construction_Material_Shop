import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";

//pages and components
import pic from "../../../assets/Group.png";

function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Performing authentication

    //If authentication is successful
    navigate("/dashboard");
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-image">
        <h1 style={{color: "white"}}>ABC SHOP</h1>
        <img src={pic} alt="sign-in-pic" />
      </div>
      <div className="sign-in-fields">
        <p style={{ color: "var(--text-color" }}>Welcome!</p>
        <h2>Sign in to your Account</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
