
// // Router.get
// const express = require('express');
// const Router=express.Router();
// // const app2 = express();
// const http = require('http');
// const server = http.createServer(app2);
// const { Server } = require("socket.io");
// const io = new Server(server);
// // const io = new Server(server,{cors: {
// //   origins: ['http://localhost:4200']
// // }});
// // const socketport =process.env.SOCKET_PORT || 3020;
// const path =require("path");
// //or
// //io=require("socket.io")(http)

// Router.get('/', (req, res) => {
//     console.log("asdasd");
//     console.log(path.join(__dirname, '../index.html'));
//   res.sendFile(path.join(__dirname, '../index.html'));
// });



// // server.listen(socketport, () => {
// //   console.log(`listening on *:${socketport}`);
// // });
// module.exports=Router














// Router.get

const serverfile=require('../server');
const express = require('express');
const Router=express.Router();
// const app2 = express();
const http = require('http');
const server = http.createServer(serverfile.app);
const { Server } = require("socket.io");
// const io = new Server(server);
const io = new Server(server,{cors: {
  origins: ['*']
},pingTimeout: 60000});
const porrt =process.env.PORT || 3021;
const socketport =process.env.SOCKET_PORT || 3020;
const path =require("path");
const socketname=io.of('/socket');
//or
//io=require("socket.io")(http)
socketname.use((socket, next) => {
  // ensure the socket has access to the "users" namespace, and then
  next();
});

// app2.get('/', (req, res) => {
//     console.log("asdasd");
//     console.log(path.join(__dirname, '../index.html'));
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

socketname.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect',()=>{

    console.log('A user disconnected');
  });
  socket.on("message",(ms)=>{
    console.log("clint to server",ms);

  })
  let romm="not";
  socket.adapter.on("create-room",(room)=>{
    console.log(`room ${room} was created`);
    romm=room
  })
  socket.join("room-"+"12")
  socket.join("room-"+"1")
  socket.to("room-"+"1").emit('connectToRoom', "You are in room no.1 "+romm+"1"+"ID"+socket.id);

  socket.to("room-"+"12").emit('connectToRoom', "You are in room no.12 "+romm+"1"+"ID"+socket.id);
});

// server.listen(socketport, () => {
//   console.log(`listening on *:${socketport}`);
// });
serverfile.connectDB().then(() => {
  server.listen(porrt, () => {
    console.log("listening for requests",porrt);
  });
});
module.exports=Router



// app2.get('/', (req, res) => {
//     console.log("asdasd");
//     console.log(path.join(__dirname, '../index.html'));
//   res.sendFile(path.join(__dirname, '../index.html'));
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect',()=>{

//     console.log('A user disconnected');
//   });
//   socket.on("message",(ms)=>{
//     console.log("clint to server",ms);

//   })
//   let romm="not";
//   socket.adapter.on("create-room",(room)=>{
//     console.log(`room ${room} was created`);
//     romm=room
//   })
//   socket.join("room-"+"12")
//   socket.join("room-"+"1")
//   io.sockets.to("room-"+"1").emit('connectToRoom', "You are in room no.1 "+romm+"1"+"ID"+socket.id);

//   io.sockets.to("room-"+"12").emit('connectToRoom', "You are in room no.12 "+romm+"1"+"ID"+socket.id);
// });

// server.listen(socketport, () => {
//   console.log(`listening on *:${socketport}`);
// });
// module.exports=Router