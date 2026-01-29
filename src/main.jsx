import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ExpenseProvider } from "./context/ExpenseContext";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpenseProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ExpenseProvider>
    </AuthProvider>
  </React.StrictMode>
);
