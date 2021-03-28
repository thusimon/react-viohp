import React from 'react';
import {connect} from 'react-redux';
import * as playerActions from '../../actions/playerActions';
import {getNoteIterator, getTimeoutFromNoteType} from './NoteIterator';
import './music-staff-player-arrow.scss';

const baseTime = 0.3; // eigth note is 300ms

const getNoteState = (noteIter, staffWidth=1200) => {
  const note = noteIter.next().value;
  if (!note) {
    return null;
  }
  const row = note.row;
  const top = initState[1] + row*200;
  const left = Math.round(note.note.x*staffWidth-8);
  const time = getTimeoutFromNoteType(note.note, baseTime);
  return {top, left, row, time, note:note.note};
}

const initState = [-8, 44]; //[x, y]

class MusicStaffPlayerArrow extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.staffRef = props.staffRef;
    // the initial noteIter and score id is null
    this.state = {noteIter: null, id: null, playing: -1, notes: []};
    this.playNext = this.playNext.bind(this);
    this.resetArrow = this.resetArrow.bind(this);
    this.shouldPlay = this.shouldPlay.bind(this);
    this.curNote;
  }

  static getDerivedStateFromProps(nextProps, state) {
    let newState = {};
    if (Array.isArray(nextProps.notes[0])) {
      if (nextProps.id != state.id) {
        // if the score id is different or current notes are not same as previous notes
        // will set new id, get a new note iter and reset the player state
        const noteIter = new getNoteIterator(nextProps.notes);
        const nextNote = noteIter.getNextNoteInfo();
        const curNote = getNoteState(nextNote)
        newState = {noteIter, nextNote, id: nextProps.id, curNote};
      }
      // update the current notes
      newState = Object.assign({}, newState, {notes: nextProps.notes});
    }
    return newState;
  }

  shouldPlay() {
    return this.props.playing == 1;
  }
  playNext() {
    // force to rerender
    if (this.state.nextNote) {
      const staffWidth = this.staffRef.current ? this.staffRef.current.offsetWidth : 1200;
      const curNote = getNoteState(this.state.nextNote, staffWidth);
      this.setState({curNote});
    }
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
    if (this.state.nextNote) {
      if (this.state.curNote) {
        this.curNote = this.state.curNote;
        top = this.curNote.top;
        left = this.curNote.left;
        row = this.curNote.row;
        time = this.curNote.time;
        note = this.curNote.note;
        if (this.shouldPlay()) {
          this.timer && clearTimeout(this.timer);
          if (note && note.freq && !this.props.analyzeState) {
            // here is a trick, AudioGenerator's audio is not long enough as time
            // muitply by 3 to have a good acoustic effect
            this.props.playNote('piano', note.freq, time*3);
          }
          this.timer = setTimeout(() => {
            this.playNext();
          }, time*1000);
        } else {
          this.timer && clearTimeout(this.timer);
        }
      } else {
        // noteState is null, probably reaches to the end to the score
        this.resetArrow();
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

function mapStateToProps(state){
  const {playing, seek} = state.player;
  const {notes, id} = state.score;
  const {analyzeState} = state.audio
  return {playing, seek, notes, id, analyzeState};
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