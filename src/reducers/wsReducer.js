import * as types from '../actions/actionTypes';
import {wsInitState as initState} from './initialState';
import {getWebSocket} from '../websockets/websocket';

export default function wsReducer(state=initState, action={}){
  switch (action.type){
    case types.GET_WEBSOCKET:
    {
      if (state.ws && state.ws.ws && state.ws.ws.readyState != WebSocket.CLOSED) {
        return state;
      } else {
        const {url} = action;
        const {ws, updateTime} = getWebSocket(url);
        return Object.assign({}, state, {ws, updateTime});
      }
    }
    default:
      return state;
  }
}
