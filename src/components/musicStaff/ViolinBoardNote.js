import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';

const ViolinBoardNote = ({note, markNotes, noteName, noteColor}) => {
  let labels = note.map(n=>n.label);
  let label = labels.join("/");
  // we should decide whether this note is marked
  let marked = false;
  for (let i=0; i<markNotes.length; i++){
    const mn = markNotes[i];
    if (note.findIndex(n=>(n.name==mn.name && n.sfIdx==mn.sfIdx)) > -1){
      marked = true;
      break;
    }
  }
  const boardNoteClassName = marked ? "violinBoardNote violinBoardNoteSelect" : "violinBoardNote";

  // we should decide whether this note is detected by audio
  let fontColor = "#b8daff";
  if (noteName=='--'){
    //show nothing
  } else if (labels.indexOf(noteName)<0){
    //show nothing
  } else {
    fontColor = noteColor;
  }
  return (
    <div className={boardNoteClassName} style={{backgroundColor:fontColor}}>{label}</div>
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
