import React from 'react';
import {deleteAccessToken} from '../../storage/utils';

const profile = ({user}) => {

  const logoutClick = () => {
    deleteAccessToken();
    window.location.reload();
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

export default profile;
