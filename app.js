const express = require("express");
const server = express();

server.use(express.static(__dirname + "/public"));

server.get("/", (req, res) => {

    res.sendFile(__dirname + "/index.html");
});

server.get("/", (req, res) => {

    res.sendFile(__dirname + "css/styles.css");
});
server.get("/", (req, res) => {

    res.sendFile(__dirname + "js/scripts.js");
});
server.get("/", (req, res) => {

    res.sendFile(__dirname + "assets/styles.css");
});
server.listen(3000, (err) => {
    if (err) return console.log(err);
    console.log("The server is listening on port 3000");
});