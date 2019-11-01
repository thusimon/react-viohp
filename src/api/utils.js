export const fetchData = async (url = '', method = 'GET', data = {}) => {
  // Default options are marked with *
  const fetchOptions = {
    method,
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  };

  if (method == 'POST' || method == 'PUT') {
    fetchOptions.body = JSON.stringify(data); // body data type must match "Content-Type" header
  }

  const response = await fetch(url, fetchOptions);
  return await response.json(); // parses JSON response into native JavaScript objects
}
