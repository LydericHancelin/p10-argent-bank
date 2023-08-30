import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getToken, getUser } from "../infrastructure/client";
import { setRemember, setUserInfos, userSelector } from "../app/userStore";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const [asError, setAsError] = useState(false);
  const errorMessage = "Invalid login";
  const { remember, email, password } = useSelector(userSelector);

  const login = async (event) => {
    event.preventDefault();
    const userName = document.getElementById("username");
    const password = document.getElementById("password");
    const rememberMe = document.getElementById("remember-me");

    console.log(remember);

    try {
      const response = await getToken(userName.value, password.value);
      if (!response.ok) {
        setAsError(true);
        throw new Error("Invalid login");
      }
      const {
        body: { token },
      } = await response.json();
      const userInfoResponse = await getUser({ token });
      if (!userInfoResponse.ok) {
        setAsError(true);
        throw new Error("Invalid login");
      }
      const {
        body: { firstName, lastName },
      } = await userInfoResponse.json();
      dispatcher(setUserInfos({ token, firstName, lastName }));
      if (!!rememberMe.checked) {
        dispatcher(setRemember());
        console.log(remember);
      }
      setAsError(false);
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                defaultValue={remember ? email : ""}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                defaultValue={remember ? password : ""}
              />
            </div>
            {asError ? <p className="error">{errorMessage}</p> : ""}
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button onClick={login} className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
      <Footer />

      <script></script>
    </>
  );
};

export default Login;
