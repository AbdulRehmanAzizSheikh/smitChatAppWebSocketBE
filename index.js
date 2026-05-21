import express from "express"
import http from "http"
import {Server} from 'socket.io'

const app = express()

const server = http.createServer(app)
const io = new Server(server)


app.use(express.static("public"))

io.on("connection", (socket) => {
    console.log("user :", socket.id);
    
})


server.listen(3000, () => {

    console.log("server is listenting on port", 3000);
    
})