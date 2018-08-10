/**
 * Created by Lu on 8/9/2018.
 */
import * as types from '../actions/actionTypes';
import initState from './initialState';

export default function authorReducer(state=initState.authors, action={}){
  switch (action.type){
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
