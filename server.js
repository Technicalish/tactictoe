import express from "express";
var app = express();
import { createServer } from "http";
import { Server } from "socket.io";
var server = createServer(app);
var io = new Server(server);
import { v4 as uuid } from "uuid";
import chalk from "chalk";

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

app.use(express.static("./public"));
app.listen(process.env.PORT || 3000);
module.exports = app;
