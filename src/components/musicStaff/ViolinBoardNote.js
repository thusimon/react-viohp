import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

const ViolinBoardNote = ({note}) => {
  let label = note.map(n=>n.label);
  label = label.join("/");
  return (
    <div className="violinBoardNote">{label}</div>
  );
};

ViolinBoardNote.propTypes = {
  note: PropTypes.array
};

export default ViolinBoardNote;
