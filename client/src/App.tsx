// src/index.tsx or src/App.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import AskUs from "./pages/AskUs";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="min-vh-100 bg-dark text-white">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              My App
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    to="/ask-us"
                  >
                    Ask Us
                  </NavLink>
                </li>
              </ul>

              {/* Right Side - Register and Login */}
              <div className="d-flex">
                {!user ? (
                  <>
                    <NavLink to="/register" className="btn btn-primary me-2">
                      Register
                    </NavLink>
                    <NavLink to="/login" className="btn btn-success">
                      Login
                    </NavLink>
                  </>
                ) : (
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/ask-us" element={<AskUs />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
