const userName = prompt("Please Enter Your Name ..?");

/* 
  Emit "join" event which contains userName which is the name of user 
  which user enter on prompt 
*/
socket.emit("join", userName);

const chatBox = document.getElementById("chat-box");
const msgBox = document.getElementById("massage-box");
const sendbtn = document.getElementById("send-btn");

//* Create instance using Event constructor to emit the click event on enter
const event = new Event("click");

/* 
  Add event Listener to Chat box so is user press enter then click event on 
  sendbtn emit automatically 
*/
msgBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    sendbtn.dispatchEvent(event);
  }
});

sendbtn.addEventListener("click", () => {
  const msg = msgBox.value;
  if (msg) {
    socket.emit("new-massage", msg);
    /* 
      If we just emit the new-massage event and not write below four lines
      then socket will automatically broadcast to others but not broadcast
      and visible to the user which emit the event  
    */
    const newElement = document.createElement("div");
    newElement.innerText = userName + " : " + msg;
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

//* When broadcast-massage event emit from back end now we need to broadcast massage to all connections
socket.on("broadcast-massage", (userMsg) => {
  console.log("Inside Event Emmitor");
  const newElement = document.createElement("div");
  newElement.innerText = userMsg.username + " : " + userMsg.massage;
  chatBox.appendChild(newElement);
});

socket.on("load_massage", (massage) => {
  massage.forEach((msg) => {
    const newElement = document.createElement("div");
    newElement.innerText = msg.username + " : " + msg.massage;
    chatBox.appendChild(newElement);
  });
});
