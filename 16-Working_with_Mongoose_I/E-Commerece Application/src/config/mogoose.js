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

async function addCategories() {
  const CategoryModel = mongoose.model("category", categorySchema);
  const categories = await CategoryModel.find()
  if (!categories || !categories.length) {
    await CategoryModel.insertMany([
      { name: "Books" },
      { name: "Electronics" },
      { name: "Gadgets" },
    ]);
  }
  console.log("Categories is Created !");
}
