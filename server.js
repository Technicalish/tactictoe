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
/*io.on("connection", (socket) => {
  socket.on("iwannaplay", async () => {
  await jumbleDb.open();
  await jumbleDb.put(socket.id, "");
  await jumbleDb.close();
  var chunk = (arr, size) => {
  var chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
    }
  return chunkedArr;
  }
  await jumbleDb.open();
  db = await jumbleDb.keys().all();
  await jumbleDb.close();
  db = chunk(db, 2);
  console.log(db)
    db.forEach(pair => {
      if (pair.length === 2) {
      var roomId = require("uuid").v4();
      var xOo = ["x", "o"];
      var bob = (arr) => {
      return arr.splice(Math.floor(Math.random()*arr.length), 1);
      }
        pair.forEach(async (id, i) => {
        var toss = bob(xOo)[0];
        io.to(id).emit("wishgranted", roomId, pair[pair.length-1-i], toss);
        await jumbleDb.open();
        await jumbleDb.del(id);
        await jumbleDb.close();
        });
      }
    });
  });
  socket.on("joinroom", (roomId) => {
  socket.join(roomId);
  })
  socket.on("disconnecting", () => {
    for (let room of socket.rooms) {
      if (room !== socket.id) {
      socket.to(room).emit("userleft", socket.id);
        io.in(room).fetchSockets()
        .then(roomUsers => {
        console.log("map", roomUsers.map(u => u.id))
          roomUsers.forEach(async user => {
            if (user.id !== socket.id) {
            await jumbleDb.open();
            await jumbleDb.put(user.id, "");
            await jumbleDb.close();
            }
          });
        });
      }
    }
  });
});*/
app.use(express.static("./public"));
server.listen(process.env.PORT || 3000);