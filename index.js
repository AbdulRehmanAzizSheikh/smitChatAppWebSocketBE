import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const users = []
app.use(express.static("public"))

io.on("connection", (socket) => {
  console.log("user connected:", socket.id)
  users.push(socket.id)
  io.emit("connectedUsers", users.length)
  socket.on("chat message", (msg) => {
    console.log("message received:", msg)
    io.emit("chat message", msg)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id)
    users.filter((user) => {
      io.emit("connectedUsers", users.length)
      return socket.id !== user.id
    })
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log("server is listening on port", PORT)
})