const webSocketCache = () => {
  const cache = {};

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
  }

  return {
    clearAllCache,
    clearCache,
    getAllCache,
    getCache,
    setCache
  }
}

module.exports = {
  webSocketCache
}