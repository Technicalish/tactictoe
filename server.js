var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var { Level } = require("level");
var jumbleDb = new Level("./jumbleDb");
io.on("connection", (socket) => {
  socket.on("iwannaplay", async () => {
  jumbleDb.put(socket.id, "");
  var chunk = (arr, size) => {
  var chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
    }
  return chunkedArr;
  }
  db = await jumbleDb.keys().all();
  db = chunk(db, 2);
    db.forEach(pair => {
      if (pair.length === 2) {
      var roomId = require("uuid").v4();
      var xOo = ["x", "o"];
      var bob = (arr) => {
      return arr.splice(Math.floor(Math.random()*arr.length), 1);
      }
        pair.forEach(id => {
        var toss = bob(xOo)[0];
        io.to(id).emit("wishgranted", roomId, toss);
        jumbleDb.del(id);
        });
      }
    });
  });
  socket.on("joinroom", (roomId) => {
  socket.join(roomId);
  })
  socket.on("disconnecting", async () => {
    for (let room of socket.rooms) {
      if (room !== socket.id) {
      socket.to(room).emit("userleft", socket.id);
      var roomUsers = await io.in(room).fetchSockets();
        roomUsers.forEach(user => {
          if (user.id !== socket.id) {
          jumbleDb.put(user.id, "");
          }
        });
      }
    }
  });
});
app.use(express.static("./public"));
server.listen(process.env.PORT || 3000);