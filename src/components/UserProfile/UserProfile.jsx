import React, { useEffect, useState } from "react";
import "./UserProfile.scss";
import Header from "../Header/Header";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("userId");

  const fetchUser = async () => {
    try {
      const req = await fetch(`http://localhost:3000/users/${userId}`);

      if (!req.ok) {
        throw new Error(`Request failed with status ${req.status}`);
      }

      const data = await req.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(userData);

  return (
    <>
      <Header />
      <div className="user-profile">
        <div className="profile-picture">
          <img src="https://picsum.photos/200/300?random=1" alt="Profile" />{" "}
        </div>
        <div className="user-details">
          <h2>{userData.name}</h2>
          <label htmlFor="">Email:</label>
          <p> {userData.email}</p>
          <label htmlFor="">Username:</label>
          <p> {userData.username}</p>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
