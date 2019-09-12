/* eslint-disable react/jsx-no-bind */
import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const SelfClearBtn = ({baseClass, activeClass, icon, clickCallBack, isClear}) => {
  const [btnState, setBtnState] = useState({active: false, timer: null});

  const className = btnState.active ? [baseClass, activeClass].join(' ') : baseClass;

  const clickBtn = (evt) => {
    if (clickCallBack) {
      clickCallBack.call(this); 
    }
    let {active, timer} = btnState;
    if (isClear) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setBtnState({active: false, timer});
      }, 300);
      setBtnState({active: true, timer});
    } else {
      setBtnState({active: !active, timer});
    }
  };

  return (
  <button type="button" className={className} onClick = {clickBtn}>
    <FontAwesomeIcon icon={icon} />
  </button>);
};

SelfClearBtn.propTypes = {
  baseClass: PropTypes.string,
  activeClass: PropTypes.string,
  icon: PropTypes.string,
  clickCallBack: PropTypes.func,
  isClear: PropTypes.bool
};

export default SelfClearBtn;
