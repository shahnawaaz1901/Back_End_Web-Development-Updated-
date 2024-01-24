const userName = prompt("Please Enter your name ..?") || "User";

const socket = io.connect("http://localhost:3200");
let profileIndex = 0;

socket.emit("newUserConnect", { name: userName || "User" });
const chatContainer = document.getElementById("chats");
const inputMessage = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");
const userList = document.querySelector(".online-users-list");
const userCount = document.querySelector("#number");
const userNamePlace = document.querySelector(".user");
//* Add UserName on Top
document.querySelector(".username").textContent = userName;
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
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="user-image">
  <img src="../image/${profileIndex}.png" alt="logo" />
</div>
<div class="user-info send-message">
  <div class="message-box-heading">
    <div class="user-name">${userName}</div>
    <div class="user-time">${new Date().toLocaleTimeString()}</div>
  </div>
  <div class="user-message">
    ${message}
  </div>
</div>`;
  newElement.classList.add("chat", "sender");
  chatContainer.appendChild(newElement);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
  socket.emit("new-message", message);
  profileIndex++;
  if (profileIndex == 5) {
    profileIndex = 0;
  }
}

function broadCastMessage(messageData) {
  const newElement = document.createElement("div");
  newElement.className = "chat";
  newElement.innerHTML = `<div class="user-image">
  <img src="../image/${profileIndex}.png" alt="" />
</div>
<div class="user-info recieve-message">
  <div class="message-box-heading">
    <div class="user-name">${messageData.name}</div>
    <div class="user-time">${new Date(
      messageData.time
    ).toLocaleTimeString()}</div>
  </div>
  <div class="user-message">${messageData.message}</div>
</div>`;
  chatContainer.appendChild(newElement);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
  profileIndex++;
  if (profileIndex == 5) {
    profileIndex = 0;
  }
}

function showOnlineUsers(user) {
  const newElement = document.createElement("div");
  newElement.className = "online-user";
  newElement.innerHTML = `<span class="online"></span>
  <span class="online-user-name">${user}</span>`;
  userList.appendChild(newElement);
}

/* Socket Events */
socket.on("broadCast_message", broadCastMessage);
socket.on("loadPreviousChats", loadChats);
socket.on("loadOnlineUsers", loadUsers);

socket.on("Update-User-List", (data) => {
  userList.innerHTML = "";
  userCount.textContent = data.length;
  for (let every of data) {
    showOnlineUsers(every);
  }
});

function loadChats(chatsData) {
  for (let everyChat of chatsData) {
    broadCastMessage(everyChat);
  }
}

function loadUsers(activeUsers) {
  for (let everyUser of activeUsers) {
    showOnlineUsers(everyUser);
  }
  userCount.textContent = activeUsers.length;
}

inputMessage.addEventListener("keyup", () => {
  socket.emit("typing", userName);
});

socket.on("typing-status", (user) => {
  const newElement = document.createElement("div");
  newElement.innerText = `${user} is typing...`;
  userNamePlace.appendChild(newElement);
});
