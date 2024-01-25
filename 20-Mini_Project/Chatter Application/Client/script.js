const userName = prompt("Please Enter your name ..?") || "User";

const socket = io.connect("http://localhost:3200");
socket.emit("newUserConnect", { name: userName || "User" });

//* For Changing User Profile logo Continuesly
let profileIndex = 0;
const chatContainer = document.getElementById("chats");
const inputMessage = document.getElementById("input-message");
const sendBtn = document.getElementById("send-btn");
const userList = document.querySelector(".online-users-list");
const userCount = document.querySelector("#number");
const userNamePlace = document.querySelector(".user");
const typingStatus = document.querySelector(".typing-status");
let typingStatusVisible = false;
const userNameSection = document.querySelector(".user");

//* Add UserName on Top
document.querySelector(".username").textContent = userName;

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

//* Show Send Message
function sendMessage() {
  const message = inputMessage.value;
  inputMessage.value = "";
  const newElement = createMessageElement({
    name: userName,
    message,
    time: new Date(),
    class: "send-message",
  });
  newElement.classList.add("chat", "sender");
  appendElement(newElement, chatContainer);
  socket.emit("new-message", message);
  incrementProfileLogoIndex();
}

//* Increment Profile logo
function incrementProfileLogoIndex() {
  profileIndex++;
  if (profileIndex == 5) {
    profileIndex = 0;
  }
}

//* Show Recieve Message
function broadCastMessage(messageData) {
  //* Remove Typing Status Before BroadCasting Message
  removeTypingStatus();

  //* Create New Element of Message
  const newElement = createMessageElement({
    ...messageData,
    class: "recieve-message",
  });
  newElement.className = "chat";
  appendElement(newElement, chatContainer);
  incrementProfileLogoIndex();
}

//* BroadCast Joined or Leave User in ChatBox
function broadCastUserStatusMessage(message) {
  const newElement = document.createElement("div");
  newElement.className = "user-status";
  newElement.textContent = message;
  appendElement(newElement, chatContainer);
}

//* Show Online Users
function showOnlineUsers(user) {
  const newElement = document.createElement("div");
  newElement.className = "online-user";
  newElement.innerHTML = `<span class="online"></span>
  <span class="online-user-name">${user}</span>`;
  userList.appendChild(newElement);
}

function loadUsers(activeUsers) {
  userList.innerHTML = "";
  for (let everyUser of activeUsers) {
    showOnlineUsers(everyUser);
  }
  userCount.textContent = activeUsers.length;
}

/* Socket Events */
socket.on("broadCast_message", broadCastMessage);
socket.on("loadPreviousChats", loadChats);
socket.on("loadOnlineUsers", loadUsers);
socket.on("typing-status", handleTypingStatus);
socket.on("Update-User-List", handleUpdateUser);

function handleUpdateUser(data) {
  console.log(data);
  loadUsers(data.activeUser);
  chatContainer.scrollBy(0, chatContainer.scrollHeight);
  if (data.reason == "join") {
    broadCastUserStatusMessage(`${data.name} Joined the Chat`);
  } else {
    broadCastUserStatusMessage(`${data.name} leaves the Chat`);
  }
}

function handleTypingStatus(user) {
  if (!typingStatusVisible) {
    showTypingStatus(user);
    setTimeout(removeTypingStatus, 3000);
  }
}
function loadChats(chatsData) {
  for (let everyChat of chatsData) {
    broadCastMessage(everyChat);
  }
}

inputMessage.addEventListener("keyup", () => {
  socket.emit("typing", userName);
});

//* Show typing Status
function showTypingStatus(user) {
  userNameSection.style.height = "60%";
  typingStatus.style.height = "30%";
  typingStatus.textContent = `${user} is typing...`;
  typingStatusVisible = true;
}

//* Remove typing Status
function removeTypingStatus() {
  userNameSection.style.height = "100%";
  typingStatus.style.height = "0px";
  typingStatus.textContent = ``;
  typingStatusVisible = false;
}

function createMessageElement(messageInfo) {
  const newElement = document.createElement("div");
  newElement.innerHTML = `<div class="user-image">
  <img src="../image/${profileIndex}.png" alt="logo" />
</div>
<div class="user-info ${messageInfo.class}">
  <div class="message-box-heading">
    <div class="user-name">${messageInfo.name}</div>
    <div class="user-time">${new Date(
      messageInfo.time
    ).toLocaleTimeString()}</div>
  </div>
  <div class="user-message">
    ${messageInfo.message}
  </div>
</div>`;
  return newElement;
}

function appendElement(element, container) {
  container.appendChild(element);
  container.scrollBy(0, container.scrollHeight);
}

//* Focus on Input Chat Box
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-message").focus();
});
