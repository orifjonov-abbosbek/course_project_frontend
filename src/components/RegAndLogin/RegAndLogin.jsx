import React, { useState } from "react";

const AuthComponent = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSwitchAuth = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here based on isRegistering state
    if (isRegistering) {
      // Handle registration
    } else {
      // Handle login
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegistering && (
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={handleSwitchAuth}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default AuthComponent;
