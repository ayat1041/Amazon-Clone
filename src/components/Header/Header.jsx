import React, { useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

function Header() {
  const { user,logOut } = useContext(AuthContext);
  console.log(user);
  const handleLogOut = () =>{
    logOut()
    .then(result => {})
    .catch(e =>console.log(e))
  }
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        {user && <span style={{color: 'white',marginLeft: "8px"}}>Welcome {user.email} <button style={{color: "white", backgroundColor: "orange", padding: "8px"}} onClick={handleLogOut}>Sign Out</button></span>}
      </div>
    </nav>
  );
}

export default Header;
