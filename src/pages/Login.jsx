import { Navigate, useNavigate } from "react-router-dom";
import { getToken, getUser } from "../infrastructure/client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import React from "react";
import { setUserInfos } from "../app/userStore";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();

  const login = async (event) => {
    event.preventDefault();
    const userName = document.getElementById("username");
    const password = document.getElementById("password");
    try {
      const response = await getToken(userName.value, password.value);
      if (!response.ok) {
        throw new Error("Invalid login");
      }
      const {
        body: { token },
      } = await response.json();
      const userInfoResponse = await getUser({ token });
      if (!userInfoResponse.ok) {
        throw new Error("Invalid login");
      }
      const {
        body: { firstName, lastName },
      } = await userInfoResponse.json();
      dispatcher(setUserInfos({ token, firstName, lastName }));
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
              <input type="text" id="username" />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
            <button onClick={login} className="sign-in-button">
              Sign In
            </button>
            {/* <!-- SHOULD BE THE BUTTON BELOW --> */}
            {/* <!-- <button class="sign-in-button">Sign In</button> -->
          <!--  --> */}
          </form>
        </section>
      </main>
      <Footer />

      <script></script>
    </>
  );
};

export default Login;
