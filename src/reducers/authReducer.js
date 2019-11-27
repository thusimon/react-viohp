import * as types from '../actions/actionTypes';
import {authInitState as initState} from './initialState';

export default function authReducer(state=initState, action={}){
  switch (action.type){
    case types.SET_USER:
    {
      return Object.assign({}, state, {user: action.user});
    }
    default:
      return state;
  }
}
