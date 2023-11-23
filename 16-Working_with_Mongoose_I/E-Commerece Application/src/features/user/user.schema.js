import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  /* We Specify Fields Require and corresponding the type of name */
  name: String,
  email: {
    type: String,
    unique: true, // Means We want to Keep email as unique
  },
  password: String,
  /* 
        We have two type of account first is for user and another one is for seller
        so we can use enums to specify the type of account. 
        Now question is what is enum, enum is use to specifies the value from of the
        fields in an array 
    */
  typeOfAccount: {
    type: String,
    /* 
        What Ever Account type we have we can specified in enum so that user has two 
        options of account type one is as a customer and another one as Seller 
    */
    enum: ["Customer", "Seller"],
  },
});
