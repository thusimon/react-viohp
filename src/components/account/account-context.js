import React from 'react'

const AccountContext = React.createContext({
  user: null,
})

export class AccountProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const contextValue = {
      user: this.props.value,
    }
    return (
      <AccountContext.Provider value={contextValue}>
        {this.props.children}
      </AccountContext.Provider>
    );
  }
}
export const AccountConsumer = AccountContext.Consumer
export default AccountContext