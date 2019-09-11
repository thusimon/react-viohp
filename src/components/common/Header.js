/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
      <NavLink to="/home" activeClassName="active">Home</NavLink>
      {" | "}
      <NavLink to="/musicstaff" activeClassName="active">Music Staff</NavLink>
      {" | "}
      <NavLink to="/about" activeClassName="active">About</NavLink>
    </nav>
  );
};

export default Header;
