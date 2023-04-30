import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
const Login = () => {
    const {signIn} = useContext(AuthContext);
const handleLogin = event =>{
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email,password)
    .then(result=>{
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
    })
    .catch(error=>{
        console.log(error);
    })
} 
  return (
    <div className="form-container">
      <h1 className="form-title">This is login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="" required />
        </div>
        <input className="btn-submit" type="submit" value="Login" />
      </form>
      <p><small>New to Ema-john? <Link to="/signup">Create new Account</Link></small></p>
    </div>
  );
};

export default Login;
<h1>This is login</h1>;
