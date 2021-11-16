const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./helpers/db")
const { host, port, db } = require("./configuration")
const app = express();
const postSchema = new mongoose.Schema({
  name: String
});
const Post = mongoose.model("Post", postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port: ${port}`);
        console.log(`Started api service on host: ${host}`);
        console.log(`Our database: ${db}`);

//        Post.find(function(err, posts) {
//          if (err) return console.error(err);
//          console.log("posts", posts);
//        });
        const silence = new Post({ name: "Silence" });
        silence.save(function(err, savedSilence) {
          if (err) return console.error(err);
          console.log('savedSilence with wolumes',savedSilence)
        });
//        console.log(silence); // 'Silence'
    });
};

//console.log("PORT", process.env.PORT);

app.get("/test", (req, res) => {
    res.send("Our api server is working correctly!");
});


connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer);
