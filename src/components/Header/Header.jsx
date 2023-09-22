import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Header.scss";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import API_KEY from "../../api/api";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [userdata, setUserdata] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    logout();
  };

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      const userUrl = `${API_KEY}/users/${userId}`;

      const response = await fetch(userUrl);

      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }

      const userData = await response.json();

      setUserdata(userData);

      console.log(userData.username);
    } catch (err) {
      console.error("An error occurred:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const menuItemClassName = ({ hover }) =>
    hover ? "my-menuitem-hover" : "my-menuitem";

  return (
    <header className="header">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Reviews" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="user-dropdown">
        {isAuthenticated ? (
          <div className="dropdown">
            <Menu
              menuButton={<MenuButton>{userdata.username}</MenuButton>}
              transition
              menuClassName="my-menu"
            >
              <MenuItem className={menuItemClassName}>Profile</MenuItem>
              <MenuItem className={menuItemClassName}>Setting</MenuItem>
              <MenuItem className={menuItemClassName}>
                <Link to="/create-review">Create Review</Link>
              </MenuItem>
              <MenuItem className={menuItemClassName} onClick={handleLogout}>
                Log out
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to="/auth">
            <button className="header-login">Login</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
