import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

const ViolinBoardNote = ({note, markNotes}) => {
  let label = note.map(n=>n.label);
  label = label.join("/");
  // we should decide whether is note is marked
  let marked = false;
  for (let i=0; i<markNotes.length; i++){
    const mn = markNotes[i];
    if (note.findIndex(n=>(n.name==mn.name && n.sfIdx==mn.sfIdx)) > -1){
      marked = true;
      break;
    }
  }
  const boardNoteClassName = marked ? "violinBoardNote violinBoardNoteSelect" : "violinBoardNote";
  return (
    <div className={boardNoteClassName}>{label}</div>
  );
};

ViolinBoardNote.propTypes = {
  note: PropTypes.array,
  markNotes: PropTypes.array
};

ViolinBoardNote.defaultProps = {
  markNotes: []
};

export default ViolinBoardNote;
