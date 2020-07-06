import {getAccessToken, storeAccessToken} from '../storage/utils';

export const fetchDataWithAccessToken = async (url = '', method = 'GET', data = {}, contentType = 'application/json') => {
  // Default options are marked with *
  const fetchOptions = {
    method,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': contentType,
      'Authorization': `Bearer ${getAccessToken()}`
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  };

  if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
    switch (contentType) {
      case 'application/json':
        fetchOptions.body = JSON.stringify(data); // body data type must match "Content-Type" header
        break;
      case 'audio/vnd.wave':
        const fd = new FormData();
        fd.append('upl', data, 'audio.wav');
        fetchOptions.body = fd;
        break;
      default:
        break;
    }
  }

  try {
    const resp = await fetch(url, fetchOptions);
    const respJson = await resp.json();
    if (resp.status == 401) {
      throw new Error(respJson.err);
    }
    const updatedAccessToken = respJson.accessToken;
    if (updatedAccessToken) {
      // store the accessToken, the accesss token should have a extended expiration
      storeAccessToken(updatedAccessToken);
    }
    return respJson;
  } catch (err) {
    return {err: err.message};
  }
}
