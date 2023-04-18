import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import cors from 'cors'
import { PORT } from './config.js'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', (socket) => {
  socket.on('room', (room) => {

    if (io.sockets.adapter.rooms.get(room)) {
      console.log(io.sockets.adapter.rooms)
      console.log("Room is occupied")
    }


    socket.join(room)
    console.log(`User ${socket.id} joined room ${room}`)

    socket.on('message', (message) => {
      console.log("Room", room, "Message:", message)
      socket.to(room).emit('message', { body: message, from: socket.id })
    })

  })

  socket.on("disconnecting", () => {
    console.log(socket.rooms); // the Set contains at least the socket ID
  });

  socket.on("disconnect", () => {
    // socket.rooms.size === 0
  });
})



server.listen(PORT)
console.log('Server listening on port ' + PORT)
