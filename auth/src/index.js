const express = require("express");
const { connectDB } = require("./helpers/db")
const { host, port, db } = require("./configuration")
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started AUTH service on port: ${port}`);
        console.log(`Started AUTH service on host: ${host}`);
        console.log(`Our database: ${db}`);
    });
};

app.get("/test", (req, res) => {
    res.send("Our AUTH server is working correctly!");
});


connectDB()
  .on('error', console.log)
  .on('disconnected', connectDB)
  .once('open', startServer);
