import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './account.scss';

const Account = ({status}) => {
  //const [displayAccount, setDisplayAccount] = useState(false);
  const [account, setAccount] = useState({});
  const [accountDisplayState, setAccountDisplayState] = useState(false);
  const accountDisplay = accountDisplayState ? 'block' : 'none';

  //const user = await fetch('/api/user/me?auth=true');
  if (account && account.name) {
    //setAccount(user);
  } else {
    //setAccount(user);
  }
  const navAccountClick = (evt) => {
    console.log('account clicked', evt);
    setAccountDisplayState(!accountDisplayState)
  }
  return (
    <div className="nav-account">
      <button onClick={navAccountClick}>
        <FontAwesomeIcon icon="user-circle" size="1x" title="Account" color="whitesmoke"/>
      </button>
      <div className="account-info" style={{display: accountDisplayState ? 'block' : 'none'}}>
        Please Login
      </div>
    </div>
  )
}

export default Account;