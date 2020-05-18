import React, {useState, useEffect} from 'react';
import {AccountProvider} from './account-context';
import Account from './account';
import {fetchDataWithAccessToken} from '../../api/utils';

const AccountPage = props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const {err, user} = await fetchDataWithAccessToken('/api/user/me', 'GET');
      if (err) {
        setUser({});
      } else {
        setUser(user);
      }
    }
    fetchAccount();
  }, []);

  return (
    <AccountProvider value={user}>
      <Account />
    </AccountProvider>
  )
}

export default AccountPage;