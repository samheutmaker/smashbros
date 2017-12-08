require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * Makes an HTTP GET request with provided querystring params
 * @param {String} url  - The url to request
 * @param {Object} params - The querystring parameters as key value pairs
 * @returns {Promise} 
 */
function GET(url, params) {
  url = `${url}?${serializeUrlParams(params)}`;
  let request = new Request(url, {
    method: 'GET',
    mode: 'cors',
  });
  return fetch(request)
}

/**
 * Parses an object into a url querystring 
 * @param {Object} params  - An object containing key value pairs to parse
 * @returns {String} The querystring parameters
 */
function serializeUrlParams(params) {
  var holder = [];
  for (var key in params) {
    if (params.hasOwnProperty(key)) {
      holder.push((encodeURIComponent(key) + '=' + encodeURIComponent(params[key])));
    }
  }
  return holder.join('&');
}


function buildLink(url, params) {
  return `${url}?${serializeUrlParams(params)}`;
}

module.exports = exports = {
  GET,
  serializeUrlParams,
  buildLink
};
