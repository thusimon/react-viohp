import * as types from './actionTypes';

export const getWebSocket = (url) => {
  return {type: types.GET_WEBSOCKET, url};
}

export const closeWebSocket = () => {
  return {type: types.CLOSE_WEBSOCKET};
}
