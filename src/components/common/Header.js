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
      <NavLink to="/musicstaff" activeClassName="active">Scores</NavLink>
      {" | "}
      <NavLink to="/musicEditor" activeClassName="active">Compose</NavLink>
      {" | "}
      <NavLink to="/about" activeClassName="active">About</NavLink>
    </nav>
  );
};

export default Header;
