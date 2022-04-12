const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
}).listen(http);

app.get("/", (req, res) => {
  res.send("Welcome");
});
io.on("connection", (socket) => {
  console.log("connect");
  socket.on("message", ({ name, message }) => {
    io.emit("message", { name, message });
    console.log(message);
  });
});

http.listen(process.env.PORT || 8000, function () {
  console.log("connect on port 8000");
});
