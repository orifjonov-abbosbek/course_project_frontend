import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Header.scss";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import API_KEY from "../../api/api";
import ThemeContext from "../../context/Theme";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import DarkModeIcon from "../../assets/dark_mode.svg";

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

      const userUrl = `http://localhost:3000/users/${userId}`;

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

  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <header className={darkMode ? "headerDark" : "header"}>
      <div className="logo">
        <img src="/path/to/logo.png" alt="Reviews" />
      </div>
      <div className="search-bar">
        <input
          className="Search_input"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="header_end">
        <button onClick={toggleDarkMode} className="header__dark_mode_btn">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 10C3 9.73478 2.89464 9.48043 2.70711 9.29289C2.51957 9.10536 2.26522 9 2 9H1C0.734784 9 0.48043 9.10536 0.292893 9.29289C0.105357 9.48043 0 9.73478 0 10C0 10.2652 0.105357 10.5196 0.292893 10.7071C0.48043 10.8946 0.734784 11 1 11H2C2.26522 11 2.51957 10.8946 2.70711 10.7071C2.89464 10.5196 3 10.2652 3 10ZM3.64 15L2.93 15.71C2.74375 15.8974 2.63921 16.1508 2.63921 16.415C2.63921 16.6792 2.74375 16.9326 2.93 17.12C3.11736 17.3063 3.37081 17.4108 3.635 17.4108C3.89919 17.4108 4.15264 17.3063 4.34 17.12L5.05 16.41C5.21383 16.2187 5.29943 15.9726 5.28971 15.7209C5.27999 15.4693 5.17566 15.2305 4.99756 15.0524C4.81947 14.8743 4.58073 14.77 4.32905 14.7603C4.07738 14.7506 3.8313 14.8362 3.64 15ZM10 3C10.2652 3 10.5196 2.89464 10.7071 2.70711C10.8946 2.51957 11 2.26522 11 2V1C11 0.734784 10.8946 0.48043 10.7071 0.292893C10.5196 0.105357 10.2652 0 10 0C9.73478 0 9.48043 0.105357 9.29289 0.292893C9.10536 0.48043 9 0.734784 9 1V2C9 2.26522 9.10536 2.51957 9.29289 2.70711C9.48043 2.89464 9.73478 3 10 3ZM15.66 5.34C15.9223 5.3389 16.1737 5.23474 16.36 5.05L17.07 4.34C17.1747 4.25035 17.2597 4.14004 17.3197 4.01597C17.3797 3.89191 17.4135 3.75677 17.4188 3.61905C17.4241 3.48133 17.4009 3.344 17.3506 3.21568C17.3004 3.08735 17.2241 2.9708 17.1266 2.87335C17.0292 2.77589 16.9126 2.69964 16.7843 2.64936C16.656 2.59909 16.5187 2.57588 16.3809 2.5812C16.2432 2.58652 16.1081 2.62025 15.984 2.68027C15.86 2.7403 15.7496 2.82532 15.66 2.93L15 3.64C14.8137 3.82736 14.7092 4.08081 14.7092 4.345C14.7092 4.60919 14.8137 4.86264 15 5.05C15.1763 5.22536 15.4116 5.32875 15.66 5.34ZM3.66 5.05C3.84626 5.23474 4.09766 5.3389 4.36 5.34C4.49161 5.34076 4.62207 5.31554 4.74391 5.26577C4.86574 5.21601 4.97656 5.14268 5.07 5.05C5.25625 4.86264 5.36079 4.60919 5.36079 4.345C5.36079 4.08081 5.25625 3.82736 5.07 3.64L4.36 2.93C4.26742 2.8361 4.15725 2.76136 4.03578 2.71005C3.91432 2.65873 3.78393 2.63184 3.65207 2.63091C3.52021 2.62998 3.38946 2.65503 3.26728 2.70463C3.14511 2.75424 3.0339 2.82742 2.94 2.92C2.8461 3.01258 2.77136 3.12275 2.72005 3.24422C2.66873 3.36568 2.64184 3.49607 2.64091 3.62793C2.63903 3.89423 2.74302 4.15037 2.93 4.34L3.66 5.05ZM19 9H18C17.7348 9 17.4804 9.10536 17.2929 9.29289C17.1054 9.48043 17 9.73478 17 10C17 10.2652 17.1054 10.5196 17.2929 10.7071C17.4804 10.8946 17.7348 11 18 11H19C19.2652 11 19.5196 10.8946 19.7071 10.7071C19.8946 10.5196 20 10.2652 20 10C20 9.73478 19.8946 9.48043 19.7071 9.29289C19.5196 9.10536 19.2652 9 19 9ZM16.36 15C16.17 14.8943 15.9508 14.8534 15.7355 14.8835C15.5202 14.9136 15.3205 15.0131 15.1668 15.1668C15.0131 15.3205 14.9136 15.5202 14.8835 15.7355C14.8534 15.9508 14.8943 16.17 15 16.36L15.71 17.07C15.8974 17.2563 16.1508 17.3608 16.415 17.3608C16.6792 17.3608 16.9326 17.2563 17.12 17.07C17.3063 16.8826 17.4108 16.6292 17.4108 16.365C17.4108 16.1008 17.3063 15.8474 17.12 15.66L16.36 15ZM10 4.5C8.9122 4.5 7.84883 4.82257 6.94436 5.42692C6.03989 6.03126 5.33494 6.89025 4.91866 7.89524C4.50238 8.90023 4.39346 10.0061 4.60568 11.073C4.8179 12.1399 5.34172 13.1199 6.11091 13.8891C6.8801 14.6583 7.86011 15.1821 8.927 15.3943C9.9939 15.6065 11.0998 15.4976 12.1048 15.0813C13.1098 14.6651 13.9687 13.9601 14.5731 13.0556C15.1774 12.1512 15.5 11.0878 15.5 10C15.4974 8.54212 14.917 7.14471 13.8862 6.11383C12.8553 5.08295 11.4579 4.50264 10 4.5ZM10 13.5C9.30777 13.5 8.63108 13.2947 8.0555 12.9101C7.47993 12.5256 7.03133 11.9789 6.76642 11.3394C6.50151 10.6999 6.4322 9.99612 6.56725 9.31718C6.7023 8.63825 7.03564 8.01461 7.52513 7.52513C8.01461 7.03564 8.63825 6.7023 9.31718 6.56725C9.99612 6.4322 10.6999 6.50151 11.3394 6.76642C11.9789 7.03133 12.5256 7.47993 12.9101 8.0555C13.2947 8.63108 13.5 9.30777 13.5 10C13.5 10.9283 13.1313 11.8185 12.4749 12.4749C11.8185 13.1313 10.9283 13.5 10 13.5ZM10 17C9.73478 17 9.48043 17.1054 9.29289 17.2929C9.10536 17.4804 9 17.7348 9 18V19C9 19.2652 9.10536 19.5196 9.29289 19.7071C9.48043 19.8946 9.73478 20 10 20C10.2652 20 10.5196 19.8946 10.7071 19.7071C10.8946 19.5196 11 19.2652 11 19V18C11 17.7348 10.8946 17.4804 10.7071 17.2929C10.5196 17.1054 10.2652 17 10 17Z"
              fill="#333333"
            />
          </svg>
        </button>
        <div className="user-dropdown">
          {isAuthenticated ? (
            <div className="dropdown">
              <Menu
                menuButton={<MenuButton>{userdata.username}</MenuButton>}
                transition
                menuClassName="my-menu"
              >
                <MenuItem className={menuItemClassName}>
                  <Link to="/">
                    <p className={menuItemClassName}>Home</p>
                  </Link>
                </MenuItem>
                <MenuItem className={menuItemClassName}>
                  <Link to="/user-profile">
                    <p className={menuItemClassName}>Profile</p>
                  </Link>
                </MenuItem>
                <MenuItem className={menuItemClassName}>
                  <Link to="/create-review">
                    <p className={menuItemClassName}>Create Review</p>
                  </Link>
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
      </div>
    </header>
  );
};

export default Header;
