var express = require("express");
var app = express();
var { createServer } = require("http");
var { Server } = require("socket.io");
var server = createServer(app);
var io = new Server(server);
var { v4: uuid } = require("uuid");
var chalk = (...args) => import("chalk").then(({default: chalk}) => chalk(...args));

io.on("connection", async (mySocket) => {
console.log(chalk.blue(`New user joined: ${mySocket.id}`));;
  mySocket.on("disconnecting", () => {
    for (let room of mySocket.rooms) {
      if (room !== mySocket.id) {
      mySocket.to(room).emit("userleft", mySocket.id);
      console.log(chalk.red(`Pinged: ${mySocket.id} has left ${room}`));
      }
    }
  });
  mySocket.on("boxclicked", (number, xOo) => {
  mySocket.broadcast.emit("boxclicked", number, xOo)
  });
var matchFound;
  for (let [id, socket] of io.of("/").sockets) {
    for (let room of socket.rooms) {
      if (room !== id) {
      var clients = await io.in(room).fetchSockets()
      clients = clients.map(u => u.id);
        if (clients.length === 1) {
        mySocket.join(room);
        var possibilities = ["x", "o"];
        var toss = () => {
        return possibilities[Math.floor(Math.random()*possibilities.length)].toString();
        };
        io.to(room).emit("userjoined", mySocket.id, toss());
        matchFound = true;
        console.log(chalk.yellow(`Match found in room: ${room}`));
        return;
        }
      }
    }
  }
  if (!matchFound) {
  var roomId = uuid();
  mySocket.join(roomId);
  console.log(chalk.green(`New room created: ${roomId}`));
  }
})

app.use(express.static(__dirname + "/public"));
app.get("*", (req, res) => {
res.status(404).send(req.path);
});
server.listen(process.env.PORT || 8080);
module.exports = server;
