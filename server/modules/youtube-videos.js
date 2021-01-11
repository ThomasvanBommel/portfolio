/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T22:14:47-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T22:34:44-04:00
 */
 const request = require("./request");

function youtubeVideos(key, id, callback){
  request({
    hostname: "youtube.googleapis.com",
    path: "/youtube/v3/search?" +
         `key=${key}&` +
         "part=snippet&" +
         "type=video&" +
         "maxResults=50&" +
         "order=date&" +
         `channelId=${id}`,
    headers: { "Accept": "application/json" }
  }, callback);
}

 module.exports = youtubeVideos;
