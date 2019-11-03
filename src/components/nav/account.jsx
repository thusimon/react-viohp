import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './account.scss';

const Account = () => {
  const [account, setAccount] = useState(null);
  const [accountDisplayState, setAccountDisplayState] = useState(false);

  const navAccountClick = (evt) => {
    evt.preventDefault();
  }
  const accountBtnClass = accountDisplayState ? 'selected' : '';
  return (
    <div className="nav-account">
      <button className={accountBtnClass} onClick={navAccountClick}>
        <FontAwesomeIcon icon="user-circle" size="1x" title="Account" color="whitesmoke"/>
      </button>
      <div className="account-info" style={{display: accountDisplayState ? 'block' : 'none'}}>
        {
          account ? `Hello ${account.email}` : 'Please login'
        }
      </div>
    </div>
  )
}

export default Account;