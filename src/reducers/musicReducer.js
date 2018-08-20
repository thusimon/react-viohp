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
    default:
      return state;
  }
};

export default musicReducer;
