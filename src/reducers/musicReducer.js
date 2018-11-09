/**
 * Created by Lu on 8/19/2018.
 */
import * as types from '../actions/actionTypes';
import {musicInitState as initState} from './initialState';

const updateMarkNote = (currMarkNotes, markNote) => {
  // markNote: {name:'C', sfIdx:3, mark: true}
  if (markNote.mark){
    // we should add this mark note to curMarkNotes array
    currMarkNotes.push(markNote);
  } else {
    // we should filter those markNotes in currMarkNotes
    currMarkNotes = currMarkNotes.filter(note => {
      return !(note.name==markNote.name && note.sfIdx==markNote.sfIdx);
    });
  }
  return currMarkNotes;
};

const musicReducer = (state=initState, action={}) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case types.ADD_NOTE:
    {
      let staffIdx = action.idx;
      let newNote = action.note;
      let curNotes = Object.assign({}, state.notes);
      let curStaffNotes = curNotes[staffIdx];
      if (!curStaffNotes){
        //no such staff
        curNotes[staffIdx] = {};
        curStaffNotes = curNotes[staffIdx];
      }
      //already has this staff
      let noteKeys = Object.keys(curStaffNotes);
      let newKey = noteKeys.length;
      curStaffNotes[newKey] = action.note;
      return Object.assign({}, state, {notes: curNotes});
    }
    case types.SET_SIGNA_SCALE:
      return Object.assign({}, state, {notes:{}, signature:action.signature, scale:action.scale});
    case types.CLEAR_ALL_NOTES:
      return Object.assign({}, state, {notes:{}, markNotes:[]});
    case types.NOTE_CLICK:
      return Object.assign({}, state, {markNotes: updateMarkNote([...state.markNotes], action.markNote)});
    case types.NOTE_DRAG:
      return Object.assign({}, state, {dragInfo: action.dragInfo});
    case types.SHOW_FREQLINE:
      return Object.assign({}, state, {freqLineVal: action.freqLineVal});
    default:
      return state;
  }
};

export default musicReducer;
