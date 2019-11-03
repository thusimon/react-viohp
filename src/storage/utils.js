export const storeAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
}

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || '';
}

export const deleteAccessToken = () => {
  return localStorage.removeItem('accessToken');
}
// probably we may need storeRefreshToken in the future