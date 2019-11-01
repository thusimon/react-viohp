import React from 'react';
import './register.scss';
import {fetchData} from '../../api/utils';

const register = () => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const registerClick = (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (email && password) {
      handleRegister({email, password});
    }
  }
  const handleRegister = async (account) => {
    const registerRes = await fetchData('/api/user', 'POST', account);
    console.log('yoyoy', registerRes);
  }
  return (
    <div className="register-page">
      <div className="register-container">
        <form>
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" required={true} ref={emailRef}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword1">Password</label>
            <input className="password" className="form-control" id="inputPassword1" placeholder="Password" required={true} ref={passwordRef}/>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword2">Confirm Password</label>
            <input className="password" className="form-control" id="inputPassword2" placeholder="Confirm Password" required={true}/>
          </div>
          {
            false && (<div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="remeberMe" />
              <label className="form-check-label" htmlFor="remeberMe">Remeber me for 30 days</label>
            </div>)
          }
          <button type="submit" className="btn btn-primary" onClick={registerClick}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default register;