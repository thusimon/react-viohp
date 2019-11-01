/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Account from '../nav/account.jsx';
import './Header.scss';

const Header = () => {
  return (
    <nav className="appNav">
      <NavLink to="/home" activeClassName="active">Home</NavLink>
      <NavLink to="/musicstaff" activeClassName="active">Scores</NavLink>
      <NavLink to="/musicEditor" activeClassName="active">Compose</NavLink>
      <NavLink to="/account" activeClassName="active">Account</NavLink>
      <NavLink to="/about" activeClassName="active">About</NavLink>
      <Account />
    </nav>
  );
};

export default Header;
