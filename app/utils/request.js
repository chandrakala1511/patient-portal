/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
import axios from 'axios';
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(method, url, data, headers) {
  let curUrl = url;
  let curData = data;
  let curHeaders = headers;

  //Check for headers
  if (!headers) {
    curHeaders = {};
    curHeaders['Content-type'] = 'application/json'
  }

  //To overcome browser cache
  if (method === 'GET') {
    curUrl = `${url}?ts=${new Date().getTime()}`;
  }

  const callingAgents = {
    method,
    url: curUrl,
    data: curData,
    headers: curHeaders
  }

  return new Promise(resolve => {
    axios(callingAgents)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        resolve(err);
      })
  })
  // return fetch(url, options)
  //   .then(checkStatus)
  //   .then(parseJSON);
}
