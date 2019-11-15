import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginRegister from './login-register';
import Profile from './profile';
import './account.scss';
import {AccountConsumer} from './account-context';

const account = () => {
  return (
    <AccountConsumer>
      {
        ({user}) => {
          let component;
          if (!user) {
            component = <span className="loading"><FontAwesomeIcon icon="spinner" size="8x" spin /></span>
          } else if (!user.email){
            component = <LoginRegister/>
          } else if (!!user.email) {
            component = <Profile user={user}/>
          } else {
            component = <LoginRegister />
          }
          return (
            <div className="account-page">
              <div className="account-container">
                {component}
              </div>
            </div>
          )
        }
      }
    </AccountConsumer>
  )
}

export default account;