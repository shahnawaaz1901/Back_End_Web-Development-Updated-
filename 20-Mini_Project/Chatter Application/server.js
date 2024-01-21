import server from "./index.js";
import connectToDB from "./mongoose.js";
server.listen(3200, (e) => {
  if (e) {
    console.log(e);
    return;
  }
  console.log("server is up and Run on Port 3200");
  connectToDB();
});
