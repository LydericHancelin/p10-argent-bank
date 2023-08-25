import { Link, Navigate, useNavigate } from "react-router-dom";
import { logout, userSelector } from "../app/userStore";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

const Header = () => {
  const { isLogged } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  let textLink = isLogged ? "Sign out" : "Sign in";
  const logoutButton = () => {
    try {
      if (!!isLogged) {
        dispatcher(logout());
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <button onClick={logoutButton} className="sign-in-button main-nav-item">
          <i className="fa fa-user-circle"></i>
          {textLink}
        </button>
      </div>
    </nav>
  );
};

export default Header;
