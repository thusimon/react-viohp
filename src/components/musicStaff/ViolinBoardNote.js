import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

const ViolinBoardNote = ({label}) => {
  console.log("Constructing board label");
  return (
    <div className="violinBoardNote">{label}</div>
  );
};

export default ViolinBoardNote;
