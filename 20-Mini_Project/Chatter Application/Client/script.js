const socket = io.connect("http://localhost:3200");

const userName = prompt("Please Enter your name ..?");

socket.emit("Connect", { name: userName });
const chatContainer = document.getElementById("chats");
const inputMessage = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");

//* Focus on Input Chat Box
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-message").focus();
});

inputMessage.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    sendMessage();
  }
});

sendBtn.addEventListener("click", () => {
  sendMessage();
});

function sendMessage() {
  const message = inputMessage.value;
  inputMessage.value = "";
  socket.emit("new-message", message);
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="user-image">
  <img src="../image/1.png" alt="" />
</div>
<div class="user-info send-message">
  <div class="message-box-heading">
    <div class="user-name">${userName}</div>
    <div class="user-time">${new Date().getHours()}:${new Date().getSeconds()}</div>
  </div>
  <div class="user-message">
    ${message}
  </div>
</div>`;
  newElement.classList.add("chat", "sender");
  chatContainer.appendChild(newElement);
}
