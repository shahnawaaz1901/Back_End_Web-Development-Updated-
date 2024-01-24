const socket = io.connect("http://localhost:3200");

const userName = prompt("Please Enter your name ..?");

socket.emit("Connect", { name: userName || "User" });
let index = 0;
const chatContainer = document.getElementById("chats");
const inputMessage = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");
const userList = document.querySelector(".online-users-list");
const userCount = document.querySelector("#number");

//* Focus on Input Chat Box
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-message").focus();
});

//* Add Event Listener to the Input Message Box
inputMessage.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    sendMessage();
  }
});

//* Click Send Button to Send the Message
sendBtn.addEventListener("click", () => {
  sendMessage();
});

//* Recieve Message
function sendMessage() {
  const message = inputMessage.value;
  inputMessage.value = "";
  socket.emit("new-message", message);
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="user-image">
  <img src="../image/1.png" alt="logo" />
</div>
<div class="user-info send-message">
  <div class="message-box-heading">
    <div class="user-name">${userName}</div>
    <div class="user-time">${new Date().getHours()}:${new Date().getMinutes()}</div>
  </div>
  <div class="user-message">
    ${message}
  </div>
</div>`;
  newElement.classList.add("chat", "sender");
  chatContainer.appendChild(newElement);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
}

function broadCastMessage(messageData) {
  const newElement = document.createElement("div");
  newElement.className = "chat";
  newElement.innerHTML = `<div class="user-image">
  <img src="../image/1.png" alt="" />
</div>
<div class="user-info recieve-message">
  <div class="message-box-heading">
    <div class="user-name">${messageData.name}</div>
    <div class="user-time">${messageData.time}</div>
  </div>
  <div class="user-message">${messageData.message}</div>
</div>`;
  chatContainer.appendChild(newElement);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
}

function updateUserData(usersData) {
  userList.innerHTML = "";
  userCount.textContent = usersData.length;
  console.log(usersData);
  for (let everyUser of usersData) {
    renderOnlineUser(everyUser);
  }
}

function renderOnlineUser(user) {
  const newElement = document.createElement("div");
  newElement.className = "online-user";
  newElement.innerHTML = `<span class="online"></span>
  <span class="online-user-name">${user}</span>`;
  userList.appendChild(newElement);
}

socket.on("broadCast_message", (messageData) => {
  broadCastMessage(messageData);
});

socket.on("Update-Active-User", (usersData) => {
  console.log("Update User");
  updateUserData(usersData);
});
