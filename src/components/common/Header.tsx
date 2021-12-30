/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Account from '../nav/account';
import './Header.scss';

const getLinkClass = (navData) => navData.isActive ? "active" : "";

const Header = () => {
  return (
    <nav className="appNav">
      <NavLink to="/home" className={getLinkClass}>Home</NavLink>
      <NavLink to="/musicstaff" className={getLinkClass}>Scores</NavLink>
      <NavLink to="/musicEditor" className={getLinkClass}>Compose</NavLink>
      <NavLink to="/musicAnalytics" className={getLinkClass}>Analytics</NavLink>
      <NavLink to="/account" className={getLinkClass}>Account</NavLink>
      <NavLink to="/about" className={getLinkClass}>About</NavLink>
      <Account />
    </nav>
  );
};

export default Header;
