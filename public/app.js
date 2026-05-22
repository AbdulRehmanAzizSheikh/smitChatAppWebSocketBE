const socket = io()

const chatForm = document.getElementById("chat-form")
const chatInput = document.getElementById("chat-input")
const messages = document.getElementById("messages")

chatForm.addEventListener("submit", (event) => {
  event.preventDefault()
  const message = chatInput.value.trim()
  if (!message) return

  socket.emit("chat message", message)
  chatInput.value = ""
})

socket.on("connect", () => {
  console.log("connected to server", socket.id)
})

socket.on("chat message", (msg) => {
  const li = document.createElement("li")
  li.textContent = msg
  messages.appendChild(li)
  window.scrollTo(0, document.body.scrollHeight)
})
socket.on("connectedUsers",(users)=>{
  document.getElementById("connected-users").innerText = `Connected Users: ${users}`
})