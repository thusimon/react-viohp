import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as authActions from '../../actions/authActions';
import validator from 'validator';
import Profile from './profile';

import {fetchDataWithAccessToken} from '../../api/utils';
const LoginRegister = (props) => {
  const [error, setError] = useState(null);
  const [formType, setFormType] = useState(0);
  const [user, setUser] = useState(null);
  const emailRef = React.createRef();
  const pwdRef = React.createRef();
  const pwd2Ref = React.createRef();
  const rememberRef = React.createRef();
  const submitClick = (evt) => {
    evt.preventDefault();
    const email = emailRef.current.value;
    const password = pwdRef.current.value;
    const password2 = pwd2Ref.current ? pwd2Ref.current.value : '';
    const remember = rememberRef.current.checked;
    if (validateForm(email, password, password2, formType)) {
      if (formType == 0) {
        handleLogin({email, password, remember});
      } else if (formType == 1) {
        handleRegister({email, password, remember})
      } else {
        // do nothing here
      }
    }
  }
  const formTypeClick = (evt) => {
    evt.preventDefault();
    let newFormType = formType + 1;
    newFormType %= 2;
    setFormType(newFormType);
    setError(null);
    setUser(null);
  }
  const validateForm = (email, password, password2, formType) => {
    let isFormValid = false;
    if (!email) {
      setError('email is required');
    } else if (!validator.isEmail(email)){
      setError('please use a valid email');
    } else if (!password) {
      setError('password is required');
    } else if (formType == 1 && !password2) {
      setError('confirm password is required');
    } else if (formType == 1 && password != password2) {
      setError('password does not match');
    } else if (formType == 1 && password.length < 4) {
      setError('password should contain 4 characters at lease');
    } else {
      setError(null);
      isFormValid = true;
    }
    return isFormValid;
  }
  const handleLogin = async (account) => {
    const {err, user, accessToken} = await fetchDataWithAccessToken('/api/user/login', 'POST', account);
    if (err) {
      setError(err);
      props.setUser(null);
    } else {
      setUser(user);
      setError(null);
      setFormType(2);
      props.setUser(user);
    }
  }
  const handleRegister = async (account) => {
    const {err, user, accessToken} = await fetchDataWithAccessToken('/api/user/register', 'POST', account);
    if (err) {
      setError(err);
      props.setUser(null);
    } else {
      setUser(user);
      setError(null);
      setFormType(2);
      props.setUser(user);
    }
  }
  const formSubmitText = formType == 0 ? "Login" : "Register";
  const changeFormText = formType == 0 ? "Register" : "Login";
  return (
    formType<2 ?
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email address</label>
        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email" ref={emailRef}/>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input type="password" className="password" className="form-control" id="inputPassword1" placeholder="Password" ref={pwdRef}/>
      </div>
      {
        formType == 1 && 
        <div className="form-group">
          <label htmlFor="inputPassword2">Confirm Password</label>
          <input type="password" className="form-control" id="inputPassword2" placeholder="Confirm Password" ref={pwd2Ref}/>
        </div>
      }
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="remeberMe" ref={rememberRef}/>
        <label className="form-check-label" htmlFor="remeberMe">Remeber me for 30 days</label>
      </div>
      <div>
        <button type="submit" className="btn btn-primary" onClick={submitClick}>{formSubmitText}</button>
        {
          error && <span className="text-danger error-msg">{error}</span>
        }
        <div className="toggle-btn">
          <button className="btn btn-link" onClick={formTypeClick}>{changeFormText}</button>
        </div>
      </div>
    </form>
    :
    <Profile user={user}/>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(authActions.setUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginRegister);
