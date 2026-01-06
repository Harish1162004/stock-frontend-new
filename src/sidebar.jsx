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

      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/orders">Orders</NavLink>
      <NavLink to="/place-order">Place Order</NavLink>
      <NavLink to="/portfolio">Portfolio</NavLink>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
