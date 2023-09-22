import React, { useState } from "react";
import "./RegAndLogin.scss";
import API_KEY from "../../api/api";

const AuthComponent = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSwitchAuth = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? `${API_KEY}/register` : `${API_KEY}/login`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Authentication successful", data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.userId);
      } else {
        const errorData = await response.json();
        console.error("Authentication failed", errorData);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="reg_container">
      <form onSubmit={handleSubmit}>
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        {isRegistering && (
          <div>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <button
          className={isRegistering ? "Register" : "Login"}
          onClick={handleSubmit}
        >
          {isRegistering ? "Register" : "Login"}
        </button>
        <label htmlFor="">
          {isRegistering
            ? "Already have an account:"
            : "Don't have an account:"}
        </label>
        <button className="switch" onClick={handleSwitchAuth}>
          {isRegistering ? " Login" : " Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthComponent;
