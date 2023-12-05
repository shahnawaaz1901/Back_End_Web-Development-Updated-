const chatBox = document.getElementById("chat-box");
const msgBox = document.getElementById("massage-box");
const sendbtn = document.getElementById("send-btn");

sendbtn.addEventListener("click", () => {
  const msg = msgBox.value;
  if (msg) {
    socket.emit("new-massage", msg);
    const newElement = document.createElement("div");
    newElement.innerText = msg;
    chatBox.appendChild(newElement);
    msgBox.value = "";
    /* 
        Emmit the Event so can server can understand that the massage 
        is send by the sender so server can store the massage and server 
        can broadcast this massage to everyOne, first argument is event
        name and next argument is the value which you want to send to the 
        server
    */
  } else {
    window.alert("Please Enter Massage");
  }

  /* 
    Check if broadCast event is occure on backend or not if occures the 
    displayed the massage in the chat box and make that massage available 
    to all the client which connected to our server
    */
});
socket.on("broadcast-massage", (msg) => {
    console.log("Inside Event Emmitor")
  const newElement = document.createElement("div");
  newElement.innerText = msg;
  chatBox.appendChild(newElement);
});
