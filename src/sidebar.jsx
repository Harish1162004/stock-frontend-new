import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2 className="logo">StockEngine</h2>

      <div className="menu">
        <NavLink to="/dashboard" className="menu-item">
          Dashboard
        </NavLink>

        <NavLink to="/orders" className="menu-item">
          Orders
        </NavLink>

        <NavLink to="/place-order" className="menu-item">
          Place Order
        </NavLink>

        <NavLink to="/portfolio" className="menu-item">
          Portfolio
        </NavLink>
      </div>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
