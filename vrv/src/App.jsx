import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./pages/UserManagement/UserManagement";
import RoleManagement from "./pages/RoleManagement/RoleManagement";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
  ]);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            RBAC Dashboard
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  User Management
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/roles">
                  Role Management
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route
            path="/users"
            element={<UserManagement roles={roles.map((role) => role.name)} />}
          />
          <Route
            path="/roles"
            element={<RoleManagement roles={roles} setRoles={setRoles} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
