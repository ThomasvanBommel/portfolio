/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T22:14:47-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-11T19:28:09-04:00
 */
 const request = require("./request");

/**
 * Callback
 * @callback
 * @param {Object} err - Null unless an error has occured
 * @param {Object} data - Response data
 * @param {Object} res - Response object containing headers and other sutff
 */
/**
 * Get all youtube video data from a channel via the youtube API
 * @param {Object} options - Function options
 * @param {string} options.key - Youtube API key
 * @param {string} options.id - Youtube channel ID
 * @param {string} [options.order=date] - One of date, rating, title, viewCount
 * @param {callback} callback - Data callback
 */
function youtubeVideos(options, callback){
  getVideos(options, (err, videos, res) => {
    if(err) return callback(err);

    getStatistics({ ...options, videos: videos }, (err, stats, res) => {
      if(err) return callback(err);

      videos.forEach((e, i) => { e.statistics = stats[i].statistics });

      callback(null, videos, res);
    });
  });
}

/**
 * Function to grab videos recursively from the youtube api
 * **includes all params from youtubeVideos function**
 * @param {string} [options.page_token] - Results page id
 */
function getVideos(options, callback){
  let path = "/youtube/v3/search?" +
             `key=${options.key}&` +
             "part=snippet&" +
             "type=video&" +
             "maxResults=50&" +
             `channelId=${options.id}`;

  if(options.page_token) path += `&pageToken=${options.page_token}`;
  path += `&order=${options.order ? options.order : "date"}`;

  get(path, getVideos, callback);
}

/**
 * Function to grab video statistics recursively from the youtube api
 * **includes all params from youtubeVideos function**
 * @param {string} [options.page_token] - Results page id
 */
function getStatistics(options, callback){
  let videos = options.videos.map(e => e.id.videoId);
  let path = "/youtube/v3/videos?" +
             `key=${options.key}&` +
             "part=statistics&" +
             "maxResults=50&";

  if(options.page_token) path += `&pageToken=${options.page_token}`;
  path += `&id=${videos}`;

  get(path, getStatistics, callback);
}

/**
 * Shared functionality between getStatistics and getVideos
 * @private
 * @param {string} path - API URL
 * @param {function} func - Function to call with possible page token
 * @param {callback} callback - Data callback
 */
function get(path, func, callback){
  request({
    hostname: "youtube.googleapis.com",
    path: path,
    headers: { "Accept": "application/json" }
  }, (err, data, res) => {
    if(err) return callback(err);

    let response = JSON.parse(data);
    let token = response.nextPageToken;

    if(token){
      console.log(`Next page of ${func.name}:`, token);

      func({ ...options, page_token: token }, (err, data, res) => {
        if(err) return callback(err);

        callback(null, [ ...response.items, ...data ], res);
      });
    }else{
      callback(null, response.items, res);
    }
  });
}

module.exports = youtubeVideos;
