import React from 'react';
import {connect} from 'react-redux';
import {deleteAccessToken} from '../../storage/utils';

const profile = ({user, setUser}) => {

  const logoutClick = () => {
    deleteAccessToken();
    window.location.reload();
    setUser(null);
  }
  return (
    <div className="profile-container">
      <div>
        <span className="label label-primary">Email</span>
        <span>{user.email}</span>
      </div>
      <div className="profile-controls">
        <button className="btn btn-primary" onClick={logoutClick}>Log out</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(authActions.setUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(profile);
