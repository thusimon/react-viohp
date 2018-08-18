/**
 * Created by Lu on 8/4/2018.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import PropTypes from 'prop-types';

const Header = ({loading}) => {
  return (
    <nav>
      <NavLink to="/home" activeClassName="active">Home</NavLink>
      {" | "}
      <NavLink to="/musicstaff" activeClassName="active">Music Staff</NavLink>
      {" | "}
      <NavLink to="/about" activeClassName="active">About</NavLink>
      {loading && <LoadingDots interval={100} length={20} />}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Header;
