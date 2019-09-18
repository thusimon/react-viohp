import React, {useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Sym from './Symbols';
import {connect} from 'react-redux';

const baseTime = 200; // eigth note is 200ms
const getTimeoutFromNoteType = (note) => {
  let time = baseTime;
  switch (note.type) {
    case Sym.NOTE_HALF:
    case Sym.NOTE_HALF_REVERSE:
    case Sym.HALFREST_TYPE:
      time = baseTime*4;
      break;
    case Sym.NOTE_QUARTER:
    case Sym.NOTE_QUARTER_REVERSE:
    case Sym.QUARTERREST_TYPE:
      time = baseTime*2;
      break;
    case Sym.NOTE_EIGHTH:
    case Sym.NOTE_EIGHTH_REVERSE:
    case Sym.EIGTHREST_TYPE:
    default:
      time = baseTime;
  }
  if (note.descriptor && note.descriptor.augment) {
    time += time/2;
  }
  return time;
};

const initState = [-8, 44]; //[x, y]

const getNoteState = (noteIter) => {
  const note = noteIter.next().value;
  if (!note) {
    return null;
  }
  const row = note.row;
  const top = initState[1] + row*200;
  const left = note.note.x-8;
  const time = getTimeoutFromNoteType(note.note);
  return {top, left, row, time, note:note.note};
};

const MusicStaffPlayerArrow = ({noteIter, staffRef, audioOscillator, playing, seek}) => {
  const noteState = getNoteState(noteIter);
  const [arrowState, setArrowState] = useState({});
  let top, left, row, time, note, timer;
  if (!noteState) {
    audioOscillator.mute();
    useEffect(() => {
      playing = 0;
    });
  } else {
    top = noteState.top;
    left = noteState.left;
    row = noteState.row;
    time = noteState.time;
    note = noteState.note;
    timer = useRef(null);
  }
  if (playing == 1 && timer) {
    timer.current = setTimeout(() => {
      setArrowState({top, left, playing: 1});
      if (note && note.freq) {
        audioOscillator.setFrequency(1);
      }
    }, time);
    if (note && note.freq) {
      setTimeout(() => {
        audioOscillator.setFrequency(note.freq);
      }, 30);
    }
    arrowState.playing !==1 && audioOscillator.start();
    audioOscillator.unmute();
  } else if (playing == 0){
    if (timer) {
      clearTimeout(timer.current); 
    }
    audioOscillator.mute();
  }
  if (row && row % 3==0 && staffRef.current) {
    //it is time to scroll
    staffRef.current.scroll(0, row*200);
  }
  const y = top ? top : arrowState.top;
  const x = left ? left : arrowState.left;
  return (<div className="triangle-down" style={{position:'absolute', top: y+'px', left:x+'px'}}/>);
};

MusicStaffPlayerArrow.propTypes = {
  noteIter: PropTypes.object,
  staffRef: PropTypes.object,
  playing: PropTypes.number,
  seek: PropTypes.number,
  audioOscillator: PropTypes.object
};

function mapStateToProps(state, ownProps){
  const {playing, seek} = state.player;
  return {playing, seek};
}

export default connect(mapStateToProps)(MusicStaffPlayerArrow);