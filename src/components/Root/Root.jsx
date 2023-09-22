import React from "react";
import RegAndLogin from "../RegAndLogin/RegAndLogin";
import Home from "../../pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import CreateReview from "../../pages/createReview/createReview";
const Root = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/create-review" element={<CreateReview />} />
        <Route path="/auth" element={<RegAndLogin />} />
      </Routes>
    </div>
  );
};

export default Root;
