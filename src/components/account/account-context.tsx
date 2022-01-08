import React, {useContext, createContext} from 'react'

const AccountContext = createContext({
  user: null,
});

export const AccountProvider = (props) => {
  const accountContext = useContext(AccountContext);
  return (
    <AccountContext.Provider value={accountContext}>
      {props.children}
    </AccountContext.Provider>
  );
};

export const AccountConsumer = AccountContext.Consumer;
export default AccountContext;
