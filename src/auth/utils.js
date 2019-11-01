export const storeAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || '';
}
// probably we may need storeRefreshToken in the future

export const fetchWithAccessToken = async (path) => {
  try {
    const resp = await fetch(path, {
      headers: {
       authorization: `Bearer ${getAccessToken()}`
      }
    });
    const respJson = await resp.json();
    const updatedAccessToken = respJson.accessToken;
    if (updatedAccessToken) {
      storeAccessToken(updatedAccessToken);
    }
    return respJson;
  } catch (err) {
    return {err};
  }
}
