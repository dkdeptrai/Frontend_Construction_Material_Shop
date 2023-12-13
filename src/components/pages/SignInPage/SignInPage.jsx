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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Performing authentication
    // try {
    //   const response = await fetch("/api/v1/auth/authenticate", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: email, password: password }),
    //   });

    //   const data = await response.json();
    //   const userData = data.user;
    //   console.log(userData);

    //   if (response.status === 200) {
    //     dispatch(setUserData(userData));
        navigate("/dashboard");

    //     console.log(data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
