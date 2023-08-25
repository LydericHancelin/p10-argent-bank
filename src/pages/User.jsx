import React, { useState } from "react";
import { setUserInfos, userSelector } from "../app/userStore";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { putUser } from "../infrastructure/client";

const User = () => {
  const { userName, firstName, token, lastName } = useSelector(userSelector);
  const dispatcher = useDispatch();
  const [isEditMode, setEditMode] = useState(false);
  const [firstname, setFirstName] = useState(firstName);
  const [lastname, setLastName] = useState(lastName);

  const editMode = () => {
    setEditMode(true);
  };
  const cancel = () => {
    setEditMode(false);
  };

  const save = async () => {
    const response = await putUser({
      token,
      user: {
        firstName: firstname,
        lastName: lastname,
      },
    });

    if (!response.ok) {
      throw new Error("An error occured when updating user");
    }
    dispatcher(
      setUserInfos({ firstName: firstname, lastName: lastname, token })
    );
    setEditMode(false);
  };
  const changeLastname = (event) => {
    setLastName(event.target.value);
  };
  const changeFirstname = (event) => {
    setFirstName(event.target.value);
  };
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userName}
          </h1>
          <button
            id="edition-button"
            onClick={editMode}
            className={`edit-button ${(isEditMode && "hidden") || ""}`}
          >
            Edit Name
          </button>
          <div
            id="inputs-div"
            className={`inputs ${isEditMode ? "" : "hidden"}`}
          >
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={changeFirstname}
              placeholder="Tony"
            />
            <input
              type="text"
              value={lastname}
              onChange={changeLastname}
              name="lastname"
              placeholder="Jarvis"
            />
          </div>
          <div
            id="buttons-div"
            className={`buttons ${isEditMode ? "" : "hidden"}`}
          >
            <button id="save-button" onClick={save}>
              Save
            </button>
            <button id="cancel-button" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default User;
