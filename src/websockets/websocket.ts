export const getWebSocket = (url) => {
  const webSockets = {};
  if (!webSockets[url]) {
    webSockets[url] = new WebSocket(url);
  }
  return webSockets[url];
}

