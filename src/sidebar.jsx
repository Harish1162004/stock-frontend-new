import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>📈 StockEngine</h2>
      </div>

      <nav className="sidebar-nav">
        <a href="/dashboard" className="nav-link active">
          📊 Dashboard
        </a>
        <a href="/portfolio" className="nav-link">
          💼 Portfolio
        </a>
        <a href="/orders" className="nav-link">
          📝 Orders
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <p className="username">👤 {username}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
