/**
 * @Author: Thomas vanBommel
 * @Date:   2021-01-10T18:29:27-04:00
 * @Last modified by:   Thomas vanBommel
 * @Last modified time: 2021-01-10T23:23:36-04:00
 */
const youtubeVideos = require("./modules/youtube-videos")
const config = require("./config.json");
const express = require("express");
const events = require("events");
const cors = require("cors");

let app = express();

let videos_loaded = false;
let videos = [];

app.emitter = new events.EventEmitter();

youtubeVideos(config.youtube_api_key, "UCbVqDf-obg_ylZZjNp1hK7Q", (err, data, res) => {
    if(err) return console.error(err);

    console.log(res.headers);

    videos = JSON.parse(data).items;

    app.emitter.emit("loaded");
});

app.emitter.on("loaded", () => {
  app.get("/youtube", cors(), (req, res) => {
    let params = new URLSearchParams(req.url.split("?")[1]);
    let page = params.get("page") ? params.get("page") : 1;
    let per_page = params.get("per_page") ? params.get("per_page") : 3;

    res.json(videos.slice((page - 1) * per_page, page * per_page));
  });

  app.listen(8000, console.log("Listening http://localhost:8000/youtube"));
});
