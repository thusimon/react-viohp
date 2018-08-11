/**
 * Created by Lu on 8/10/2018.
 */
import * as types from '../actions/actionTypes';
import initState from './initialState';

export default function ajaxStatusReducer(state=initState.ajaxCallsInProgress, action={}){
  if(action.type == types.BEGIN_AJAX_CALL){
    return state+1;
  } else if (action.type == types.AJAX_CALL_ERROR ||
    action.type.endsWith('_SUCCESS')){
    return state-1;
  }
  return state;
}
