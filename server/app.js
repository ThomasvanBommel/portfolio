/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T18:29:27-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T22:07:39-04:00
 */
const request = require("./modules/request");

const config = require("./config.json");
const express = require("express");
const events = require("events");
const cors = require("cors");

let app = express();

let videos_loaded = false;
let videos = [];

app.emitter = new events.EventEmitter();

request({
  hostname: "youtube.googleapis.com",
  path: "/youtube/v3/search?" +
        `key=${config.youtube_api_key}&` +
        "part=snippet&" +
        "type=video&" +
        "channelId=UCbVqDf-obg_ylZZjNp1hK7Q",
  headers: { "Accept": "application/json" }
}, (err, data, res) => {
  if(err) return console.error(err);

  videos = JSON.parse(data).items;

  app.emitter.emit("loaded");
});

app.emitter.on("loaded", () => {
  app.get("/youtube", cors(), (req, res) => {
    res.json(videos);
  });

  app.listen(8000, console.log("Listening http://localhost:8000/youtube"));
});
