import server from "./index.js";
import connectToDB from "./mongoose.js";
server.listen(process.env.PORT || 3200, (e) => {
  if (e) {
    console.log(e);
    return;
  }
  console.log("server is up and Run on Port 3200");
  connectToDB();
});
