import React from 'react';
import * as playerActions from '../../actions/playerActions';
import { useDispatch } from 'react-redux';

const ViolinBoardNote = ({note, markNotes, noteName, noteColor}) => {
  const dispatch = useDispatch();
  let labels = note.map(n => n.label);
  let label = labels.join('/');
  // we should decide whether this note is marked
  let marked = false;
  for (let i = 0; i < markNotes.length; i++){
    const mn = markNotes[i];
    if (note.findIndex(n => (n.name == mn.name && n.sfIdx == mn.sfIdx)) > -1){
      marked = true;
      break;
    }
  }
  const freq = note[0].freq;
  const boradNoteClick = (e) => {
    const element = e.target;
    element.classList.add('violinBoardNoteClick');
    dispatch(playerActions.playNote('piano', freq, 3));
    setTimeout(() => {
      element.classList.remove('violinBoardNoteClick');
    }, 300)
  }
  let boardNoteClassName = marked ? 'violinBoardNote violinBoardNoteSelect' : 'violinBoardNote';

  // we should decide whether this note is detected by audio
  let audioClass = '';
  if (noteName == '--'){
    //show nothing
  } else if (labels.indexOf(noteName)<0){
    //show nothing
  } else {
    if (noteColor === '#FF0000') {
      audioClass = ' violinBoardAudioHigh';
    } else if (noteColor === '#00FF00') {
      audioClass = ' violinBoardAudioLow';
    }
  }
  boardNoteClassName += audioClass;
  return (
    <div className={boardNoteClassName} title={`${freq}Hz`} onClick={boradNoteClick}>{label}</div>
  );
};

export default ViolinBoardNote;
