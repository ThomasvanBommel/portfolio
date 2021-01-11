/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T18:32:03-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T19:00:02-04:00
 */
const https = require("https");

/**
 * Callback
 * @callback
 * @param {Object} err - Null unless an error has occured
 * @param {Object} data - Response data
 * @param {Object} res - Response object containing headers and other sutff
 */
/**
 * Request data from a host
 * @param {Object} options - Request options
 * @param {string} options.hostname - Host to send request to
 * @param {string} [options.path] - URL path
 * @param {Object} [options.headers] - Request headers
 */
function request(options, callback){
  let req = https.get(options, res => {
    let data = "";

    res.on("data", d => { data += d; });
    res.on("end", () => { callback(null, data, res) });
  });

  req.on("error", callback);
  req.end();
}

module.exports = request;
