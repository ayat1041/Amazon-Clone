import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        {user && <span style={{color: 'white'}}>Welcome {user.email}</span>}
      </div>
    </nav>
  );
}

export default Header;
