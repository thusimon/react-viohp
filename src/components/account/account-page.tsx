import React, {useState, useEffect} from 'react';
import {AccountProvider} from './account-context';
import Account from './account';
import {fetchDataWithAccessToken} from '../../api/utils';

// TODO: fix API called twice when refresh AccountPage
const AccountPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      const {err, user} = await fetchDataWithAccessToken('/api/user/me', 'GET');
      if (err) {
        setUser({});
      } else {
        setUser(user);
      }
    }
    fetchAccount();
  }, []);

  return (
    <AccountProvider value={user}>
      <Account user={user} />
    </AccountProvider>
  );
}

export default AccountPage;
