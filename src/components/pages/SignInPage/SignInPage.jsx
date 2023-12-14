import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import { setUserData } from "../../../actions/userActions";
import { useDispatch } from "react-redux";

//pages and components
import pic from "../../../assets/Group.png";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/v1/auth/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      const userData = data.user;
      console.log(userData);

      if (response.status === 200) {
        dispatch(setUserData(userData));
        navigate("/dashboard");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message === "This account is not found") {
        setEmailError(true);
      } else if (error.message === "User not found or Incorrect password") {
        setEmailError(true);
        setPasswordError(true);
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-image">
        <h1 style={{ color: "white" }}>ABC SHOP</h1>
        <img src={pic} alt="sign-in-pic" />
      </div>
      <div className="sign-in-fields">
        <p style={{ color: "var(--text-color" }}>Welcome!</p>
        <h2>Sign in to your Account</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label">Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          {emailError ? (
            <p style={{ color: "red", margin: "0" }}>Email does not exist.</p>
          ) : null}
          <br />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError ? (
            <p style={{ color: "red", margin: "0" }}>Password is incorrect.</p>
          ) : null}
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
