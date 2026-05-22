import express from "express"
import http from "http"
import { fileURLToPath } from "url"
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

const PORT = process.env.PORT || 3000
function startServer(port = PORT) {
  server.listen(port, () => {
    console.log("server is listening on port", port)
  })
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url)
if (isDirectRun) {
  startServer()
}

export { app, server, io, startServer }
