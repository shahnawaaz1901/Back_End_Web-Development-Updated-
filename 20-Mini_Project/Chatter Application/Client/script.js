const socket = io.connect("http://localhost:3200");

const userName = prompt("Please Enter your name ..?");

socket.emit("connection");
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("input-message").focus();
});
