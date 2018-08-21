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
  switch (action.type) {
    case types.ADD_NOTES:
      return action.notes;
    case types.GENERATE_SCALE_HEAD:
      return Object.assign({}, state, {scaleHead:action.scaleHead, notes:[]});
    case types.SHOW_SCALE_NOTES:
      return Object.assign({}, state, {notes: action.scaleNotes});
    case types.CLEAR_ALL_NOTES:
      return Object.assign({}, state, {notes:[]});
    case types.NOTE_CLICK:
      return Object.assign({}, state, {markNotes: updateMarkNote([...state.markNotes], action.markNote)});
    default:
      return state;
  }
};

export default musicReducer;
