import app from "./index.js";
import connectToDB from "./src/config/mongoose.js";
app.listen(3200, async function (err) {
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port : 3200`);
  await connectToDB();
});
