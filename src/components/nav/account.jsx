import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './account.scss';

const Account = ({status}) => {
  const [displayAccount, setDisplayAccount] = useState(false);
  const accountDisplay = displayAccount ? 'block' : 'none';

  const navAccountClick = (evt) => {
    console.log('account clicked', evt);
  }
  return (
    <div className="nav-account">
      <button onClick={navAccountClick}>
        <FontAwesomeIcon icon="user-circle" size="1x" title="Account" color="whitesmoke"/>
      </button>
      <div className="account-info" style={{display: accountDisplay}}>Hello Guest</div>
    </div>
  )
}

export default Account;