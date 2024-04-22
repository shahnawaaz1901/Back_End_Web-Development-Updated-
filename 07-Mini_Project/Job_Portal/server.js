import app from "./index.js";
const { PORT } = process.env;
app.listen(PORT, async function (err) {
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port : ${PORT}`);
});
