import * as React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
