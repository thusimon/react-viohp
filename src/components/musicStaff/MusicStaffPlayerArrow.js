import React, {useState, useRef } from 'react';
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
  if (!noteState) {
    audioOscillator.mute();
    return;
  }
  const {top, left, row, time, note} = noteState;
  const timer = useRef(null);
  const [arrowState, setArrowState] = useState({top, left, playing: -1});
  if (playing == 1) {
    timer.current = setTimeout(() => {
      setArrowState({top, left, playing: 1});
      if (note.freq) {
        audioOscillator.setFrequency(1);
        /*
        setTimeout(() => {
          audioOscillator.setFrequency(freq);
        }, 40);
        */
      }
    }, time);
    if (note.freq) {
      setTimeout(() => {
        audioOscillator.setFrequency(note.freq);
      }, 30);
    }
    arrowState.playing !==1 && audioOscillator.start();
    audioOscillator.unmute();
  } else if (playing == 0){
    clearTimeout(timer.current);
    audioOscillator.mute();
  }
  if (row % 3==0 && staffRef.current) {
    //it is time to scroll
    staffRef.current.scroll(0, row*200);
  }
  return (<div className="triangle-down" style={{position:'absolute', top: top+'px', left:left+'px'}}/>);
};

MusicStaffPlayerArrow.propTypes = {
  noteIter: PropTypes.object,
  staffRef: PropTypes.object,
  playing: PropTypes.number,
  seek: PropTypes.number,
  audioOscillator: PropTypes.object
};

function mapStateToProps(state, ownProps){
  return state.player;
}

export default connect(mapStateToProps)(MusicStaffPlayerArrow);