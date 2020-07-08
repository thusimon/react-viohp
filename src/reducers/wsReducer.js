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
    case types.CLOSE_WEBSOCKET: {
      if (state.ws && state.ws.ws && state.ws.ws.readyState != WebSocket.CLOSED) {
        state.ws.ws.close(1005, 'close gracefully');
      }
      return state;
    }
    default:
      return state;
  }
}
