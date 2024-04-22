import app from "./index.js";
import connectToDB from "./src/config/mongoose.js";
import path from "path";
const { PORT } = process.env;
app.listen(PORT, async function (err) {
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port : ${PORT}`);
  await connectToDB();
});
