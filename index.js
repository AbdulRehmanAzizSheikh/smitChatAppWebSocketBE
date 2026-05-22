import express from "express"
import http from "http"
import path from "path"
import { fileURLToPath } from "url"
import { Server } from "socket.io"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "https://smitchatappwebsocketbe.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

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
server.listen(PORT, () => {
  console.log("server is listening on port", PORT)
})