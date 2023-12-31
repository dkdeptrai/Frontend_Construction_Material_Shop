import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignInPage.css";
import { setUserData } from "../../actions/userActions";
import { useDispatch } from "react-redux";
import { API_CONST } from "../../constants/apiConstants";
import { ClipLoader } from "react-spinners";

//pages and components
import pic from "../../assets/Group.png";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setAuthError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setAuthError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(API_CONST + "/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      const data = await response.json();
      const userData = data.user;
      console.log(userData);

      if (response.status === 200) {
        sessionStorage.setItem("token", data.token);
        dispatch(setUserData(userData));
        navigate("/dashboard");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error.message === "User not found or Incorrect password") {
        setAuthError(true);
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-page">
      {loading && (
        <div className="blur-background">
          <ClipLoader color={"#123abc"} size={150} />
        </div>
      )}
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
          {authError ? (
            <p style={{ color: "red", margin: "0" }}>
              Email or password is incorrect.
            </p>
          ) : null}
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
