/**
 * Created by Lu on 8/19/2018.
 */
import * as types from '../actions/actionTypes';
import {musicInitState as initState} from './initialState';

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
      console.log("note click reducer");
      console.log(state);
      console.log(action);
      var markNotes = state.markNotes;
      var markNote = action.markNote;
      // need to filter the markNotes, only keep the mark=true

      markNotes.concat(action.markNote);
      console.log(markNotes);
      console.log(Object.assign({}, state, {markNotes}));
      return Object.assign({}, state, {markNotes});
    default:
      return state;
  }
};

export default musicReducer;
