/**
 * Created by Lu on 11/3/2018.
 */
import React from 'react';

const ToggleButton = ({text, toggle})=>{
  let arrow;
  if (toggle){
    arrow = <i className="arrow up"></i>;
  } else {
    arrow = <i className="arrow down"></i>;
  }
  return (
    <button type="button" className="btn btn-primary btn-xs">
      <span style={{verticalAlign:"middle",marginRight:"5px"}}>{text}</span>
      {arrow}
    </button>
  );
};

export default ToggleButton;
