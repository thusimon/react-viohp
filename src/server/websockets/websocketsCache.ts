const WebSocketCache = () => {
  let cache = {};
  const cacheExpireTimeout = 60 * 60 * 24 * 1000; // 1d;
  const clearAllCache = () => {
    cache = {};
  }

  const clearCache = (id) => {
    delete cache[id];
  }

  const getAllCache = () => {
    return cache;
  }

  const getCache = (id, entry) => {
    if (!cache[id]) {
      cache[id] = {};
    }
    return cache[id][entry];
  }

  const setCache = (id, entry, value) => {
    if (!cache[id]) {
      cache[id] = {};
    }
    cache[id][entry] = value;
    cache[id]['updatedTime'] = Date.now();
  }

  const cleanCache = () => {
    for (let id in cache) {
      if (cache[id]['updatedTime'] < Date.now() + cacheExpireTimeout) {
        delete cache[id];
      }
    }
  }

  return {
    clearAllCache,
    clearCache,
    getAllCache,
    getCache,
    setCache,
    cleanCache
  }
}

export default WebSocketCache;
