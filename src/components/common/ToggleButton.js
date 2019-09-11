/**
 * Created by Lu on 11/3/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({text, toggle, onclick})=>{
  let arrow;
  if (toggle){
    arrow = <i className="arrow up" />;
  } else {
    arrow = <i className="arrow down" />;
  }
  return (
    <button type="button" className="btn btn-primary btn-sm" onClick={onclick}>
      <span style={{verticalAlign:"middle",marginRight:"5px"}}>{text}</span>
      {arrow}
    </button>
  );
};

ToggleButton.propTypes = {
  text:PropTypes.string.isRequired,
  toggle:PropTypes.bool.isRequired,
  onclick:PropTypes.func.isRequired
};

export default ToggleButton;
