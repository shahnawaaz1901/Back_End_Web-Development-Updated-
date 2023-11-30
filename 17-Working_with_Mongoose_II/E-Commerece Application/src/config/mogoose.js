import mongoose from "mongoose";
import "../../env.js";
import { categorySchema } from "../features/products/category.schema.js";

const url = process.env.DB_URL;
export const connenctUsingMongoose = async () => {
  /* 
    Connect function takes arguments first is string and another one
    is Optional arguments which use to connect latest mongoose server
    */

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Datbase Connected Via Mongoose");
    await addCategories();
  } catch (error) {
    console.log(error);
    console.log("Error While Connecting with Database !!");
  }
};

/* 
  When Our database is Connected we store some data into the database it's 
  called seeding some initial Data into the database. By Default mongoose 
  have its own feature that if we specify collection name in capital letter
  then is converts it to small letter and when ever we specify the value of
  collection it automatically adds the "s" or "ies" which defines that multiple
  documents is exist or we can understand if we use the collection name in
  singular form then it convert actual name of collection in plural form 
*/
async function addCategories() {
  const CategoryModel = mongoose.model("Category", categorySchema);
  const categories = await CategoryModel.find();
  if (!categories || !categories.length) {
    await CategoryModel.insertMany([
      { name: "Books" },
      { name: "Electronics" },
      { name: "Gadgets" },
      { name: "Cloths" },
    ]);
  }
  console.log("Categories is Created !");
}
