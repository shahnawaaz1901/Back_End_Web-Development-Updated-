import mongoose from "mongoose";
import Grid from "gridfs-stream";

const connectToDB = async () => {
  try {
    const { DB_URL } = process.env;
    const conn = mongoose.createConnection(`${DB_URL}/JobPortal`);
    Grid.mongo = mongoose.mongo;

    conn.once("open", () => {
      // Initialize Stream
      var gfs = Grid(conn.db);
      gfs.collection("uploads");
      console.log("Database is Connected Via Mongoose !!");
    });
  } catch (error) {
    console.log("Error While Connecting with Database");
  }
};

export default connectToDB;
