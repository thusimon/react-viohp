import React from 'react';
import PropTypes from 'prop-types';
import * as Sym from './Symbols';
import {connect} from 'react-redux';
import * as playerActions from '../../actions/playerActions';
import getNoteIterator from './NoteIterator';
import './music-staff-player-arrow.scss';

const baseTime = 0.2; // eigth note is 200ms
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

const getNoteState = (noteIter, staffWidth) => {
  const note = noteIter.next().value;
  if (!note) {
    return null;
  }
  const row = note.row;
  const top = initState[1] + row*200;
  const left = Math.round(note.note.x*staffWidth-8);
  const time = getTimeoutFromNoteType(note.note);
  return {top, left, row, time, note:note.note};
};

class MusicStaffPlayerArrow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.staffRef = props.staffRef;
    // the initial noteIter and score id is null
    this.state = {noteIter: null, id: null, playing: -1, notes: []};
    this.startPlay = this.startPlay.bind(this);
    this.resetArrow = this.resetArrow.bind(this);
  }
  static getDerivedStateFromProps(nextProps, state) {
    let newState = null;
    if (Array.isArray(nextProps.notes[0])) {
      if (nextProps.id != state.id || nextProps.notes != state.notes) {
        // if the score id is different or current notes are not same as previous notes
        // will set new id, get a new note iter and reset the player state
        const noteIter = new getNoteIterator(nextProps.notes);
        const nextNote = noteIter.getNextNoteInfo();
        newState = {noteIter, nextNote, id: nextProps.id};
      }
      // update the current notes
      newState = {...newState, notes: nextProps.notes};
    }
    if (nextProps.playing === 1){
      // start playing
      newState = newState || {};
      newState = {...newState, playing: 1}
    } else if (nextProps.playing === 0){
      // stop playing
      newState = newState || {};
      newState = {...newState, playing: 0}
    }
    return newState;
  }
  startPlay() {
    // force to rerender
    this.forceUpdate();
  }
  resetArrow() {
    // reset player;
    this.props.playerReset();
    if (this.state.noteIter) {
      this.state.noteIter.resetIdx();
    }
    this.state = Object.assign(this.state, {id: null, playing:-1});
  }
  render() {
    // initial state
    var top, left, row, time, note;
    var staffWidth = this.staffRef.current ? this.staffRef.current.offsetWidth : 1200;
    if (this.state.nextNote) {
      const noteState = getNoteState(this.state.nextNote, staffWidth);
      if (noteState) {
        top = noteState.top;
        left = noteState.left;
        row = noteState.row;
        time = noteState.time; // in second unit
        note = noteState.note;
      } else {
        // noteState is null, probably reaches to the end to the score
        this.resetArrow();
      }
    }
    if (this.state.playing == 1 && time) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.startPlay();
      }, time*1000);
      if (note && note.freq) {
        // here is a trick, AudioGenerator's audio is not long enough as time
        // muitply by 3 to have a good acoustic effect
        this.props.playNote('piano', note.freq, time*3);
      }
    } else if (this.state.playing == 0){
      if (this.timer) {
        clearTimeout(this.timer); 
      }
    }
    if (row && row % 3==0 && this.staffRef.current) {
      //it is time to scroll
      this.staffRef.current.scroll(0, row*200);
    }
    const y = top ? top : 0;
    const x = left ? left : 0;
    return (<div className="triangle-down" style={{position:'absolute', top: y+'px', left:x+'px'}}/>);
    }
}

MusicStaffPlayerArrow.propTypes = {
  staffRef: PropTypes.object,
  playing: PropTypes.number,
  seek: PropTypes.number,
  notes: PropTypes.array,
  playNote: PropTypes.func,
  playerReset: PropTypes.func
};

function mapStateToProps(state){
  const {playing, seek} = state.player;
  const {notes, id} = state.music;
  return {playing, seek, notes, id};
}

function mapDispatchToProps(dispatch) {
  return {
    playNote: (sound, freq, time) => {
      dispatch(playerActions.playNote(sound, freq, time));
    },
    playerReset: () => {
      dispatch(playerActions.reset());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicStaffPlayerArrow);