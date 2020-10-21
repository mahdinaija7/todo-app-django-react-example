import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function Navigation(props) {
  const nav_logged_in = (
    <div className="navbar">
      <NavLink activeClassName="active" exact to="/">
        My List
      </NavLink>
      <NavLink
        onClick={props.handleLogout}
        activeClassName="active"
        to="/access"
      >
        Logout {props.username}{" "}
      </NavLink>
    </div>
  );

  const nav_logged_out = (
    <div className="navbar">
      <NavLink activeClassName="active" exact to="/">
        My List
      </NavLink>
      <NavLink activeClassName="active" to="/access">
        Login/Register
      </NavLink>
    </div>
  );

  return <>{props.is_logged ? nav_logged_in : nav_logged_out}</>;
}

export default Navigation;
