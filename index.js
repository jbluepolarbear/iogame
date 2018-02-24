const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express()
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(__dirname))

const server = http.createServer(app);
const io = socketio(server);
const Game = require('./src/game');
const game = new Game(io);

const intervalId = setInterval(() => {
    if (!game.running) {
        cancelInterval(intervalId);
        return;
    }
    game.update(0.016);
}, 0.016 * 1000.0);

server.listen(3000);
