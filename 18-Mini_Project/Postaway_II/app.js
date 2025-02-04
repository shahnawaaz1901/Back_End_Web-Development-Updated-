import server from "./index.js";
import connectToDB from "./config/mongoose.js";

const Port = process.env.PORT || 8000;
//* Listen Server
server.listen(Port, async (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server is up and Run on Port 3200");
  //* Connect to Database After Starting the Server
  await connectToDB();
});
