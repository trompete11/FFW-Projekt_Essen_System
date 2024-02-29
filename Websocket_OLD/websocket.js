import { Server } from "socket.io";
import { registerOrderHandlers } from "./orderHandler.js";
import { registerLineHandlers } from "./lineHandler.js";
import { registerItemHandlers } from "./itemHandler.js";

const io = new Server(3000, {
  cors: {
    origin: "*"
  }
});
console.log("starting socket");


io.on("connection", (socket) => {
  if(socket.handshake.auth.token !== "1234"){
    console.log(socket.id + " wrong auth");
    socket.disconnect();
  }
  else{
    console.log(socket.id + " connect");
  }

  socket.join(socket.handshake.headers.room);

  registerOrderHandlers(io, socket);
  registerLineHandlers(io, socket);
  registerItemHandlers(io, socket);

  socket.on("disconnect", (reason) => {
    console.log("disconneting: " + socket.id + ", " + reason)
  })
});

//setInterval(function () {io.emit("time", Date())}, 1000);