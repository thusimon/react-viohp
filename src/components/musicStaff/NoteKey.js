/**
 * Created by Lu on 8/19/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';
import * as Symbols from './Symbols';

const NoteKey = ({name}) => {
  let code='&nbsp;';
  let centerYOffSet = 35;
  switch (name){
    case 'sharp':
      code = Symbols.SHARP;
      break;
    case 'flat':
      code = Symbols.FLAT;
      centerYOffSet = 45;
      break;
    case 'natural':
      code = Symbols.NATURAL;
      break;
    default:
      break;
  }
  return (
    <div className="note noteKey">
      <span style={{position:'absolute', top:-centerYOffSet+'px'}}>{code}</span>
    </div>
  );
};

NoteKey.propTypes = {
  name: PropTypes.string
};
//TODO should use percentage instead of pixels
NoteKey.center=[9,0];

export default NoteKey;

