import * as types from '../actions/actionTypes';
import {playerInitState as initState} from './initialState';

export default function playerReducer(state=initState, action={}){
  switch (action.type){
    case types.PLAY:
    {
      return Object.assign({}, state, {playing: 1});
    }
    case types.PAUSE:
    {
      return Object.assign({}, state, {playing: 0});
    }
    case types.BACKWARD:
    {
      return Object.assign({}, state, {seek: -1});
    }
    case types.FORWARD:
    {
      return Object.assign({}, state, {seek: 1});
    }
    case types.RESET_SEEK:
    {
      return Object.assign({}, state, {seek: 0});  
    }
    default:
      return state;
  }
}
