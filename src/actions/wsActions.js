import * as types from './actionTypes';

export const getWebSocket = (url) => {
  return {type: types.GET_WEBSOCKET, url};
}
