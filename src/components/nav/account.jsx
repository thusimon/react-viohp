import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './account.scss';

const Account = ({status}) => {
  //const [displayAccount, setDisplayAccount] = useState(false);
  const [account, setAccount] = useState(null);
  const [accountDisplayState, setAccountDisplayState] = useState(false);
  const accountDisplay = accountDisplayState ? 'block' : 'none';

  useEffect(() => {
    const fetchAccount = async () => {
      const resp = await fetch('/api/user/me?auth=true');
      const account = await resp.json();
      if (account && account.email) {
        setAccount(account);
      } else {
        setAccount(null);
      }
      console.log(2222, account)
    }
    fetchAccount();
  }, []);

  const navAccountClick = (evt) => {
    console.log('account clicked', evt);
    setAccountDisplayState(!accountDisplayState)
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