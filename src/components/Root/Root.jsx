import React from "react";
import RegAndLogin from "../RegAndLogin/RegAndLogin";
import Home from "../../pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CreateReview from "../../pages/createReview/createReview";
import UserProfile from "../UserProfile/UserProfile";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
const Root = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<RegAndLogin />} />
        <Route element={<PrivateRoute />}>
          <Route path="/create-review" element={<CreateReview />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Root;
