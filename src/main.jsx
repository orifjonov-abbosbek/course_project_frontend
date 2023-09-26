import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/Root/Root";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/Theme";

import "./base.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
