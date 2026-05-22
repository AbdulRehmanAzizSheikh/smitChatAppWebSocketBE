const socket = io("https://smitchatappwebsocketbe-production.up.railway.app")

const sendButton = document.getElementById("send")
const chatInput = document.getElementById("chat-input")
const messages = document.getElementById("messages")

sendButton.addEventListener("click", (event) => {
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