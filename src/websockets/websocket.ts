import { v4 as uuidv4 } from 'uuid';
import {getAccessToken} from '../storage/utils';

export const getWebSocket = (url, options?) => {
  const defaultReconnectTimeout = 20*1000; // 20 seconds

  let res = {
    ws: null,
    updateTime: Date.now()
  };

  const createWs = () => {
    // TODO we can't add accessToken in websocket header, so pass it via url
    // which might be a security concern
    const id = uuidv4();
    let ws = new WebSocket(`${url}?id=${id}&accessToken=${getAccessToken()}`);
    ws['id'] = id;
    ws.onclose = wsOnClose;
    res.ws = ws;
    res.updateTime = Date.now();
  }

  const wsOnClose = (event) => {
    console.log('ws closed', event);
    if (options && options.reconnect) {
      const reconnectTimeout = options.reconnectTimeout || defaultReconnectTimeout;
      setTimeout(() => {
        createWs();
        res.ws.onclose = wsOnClose;
      }, reconnectTimeout);
    }
  }
  createWs();
  return res;
}
