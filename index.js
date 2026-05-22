import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("public"))

io.on("connection", (socket) => {
  console.log("user connected:", socket.id)

  socket.on("chat message", (msg) => {
    console.log("message received:", msg)
    io.emit("chat message", msg)
  })

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id)
  })
})

server.listen(3000, () => {
  console.log("server is listening on port 3000")
})