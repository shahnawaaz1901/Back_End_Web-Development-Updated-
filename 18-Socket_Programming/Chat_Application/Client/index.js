const chatBox = document.getElementById("chat-box");
const msgBox = document.getElementById("massage-box");
const sendbtn = document.getElementById("send-btn");

sendbtn.addEventListener("click", () => {
  const msg = msgBox.value;
  if (msg) {
    const newElement = document.createElement("div");
    newElement.innerText = msg;
    chatBox.appendChild(newElement);
    msgBox.value = "";
    socket.emit("new-massage", msg);
  } else {
    window.alert("Please Enter Massage");
  }
});
