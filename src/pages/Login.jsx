import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@events-palace.com");
  const [password, setPassword] = useState("admin123");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@events-palace.com" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      // For this demo/premium version, let's still just navigate
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="login-page">
      <div className="login-mesh-bg"></div>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="prestige-logo-container">
              <div className="prestige-logo-inner">A</div>
            </div>
            <h1 className="login-title">Admin Portal</h1>
            <p className="login-subtitle">Management Console Access</p>
          </div>

          <div className="admin-status-bar">
            <div className="status-dot pulse"></div>
            <span>System Active • Access Restricted</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Administrative Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@events-palace.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Access Key / Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>


            <button type="submit" className="login-btn-premium">
              SECURE SIGN IN
            </button>
          </form>

          <footer className="login-footer-premium">
            <p>© 2026 Events Palace</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
