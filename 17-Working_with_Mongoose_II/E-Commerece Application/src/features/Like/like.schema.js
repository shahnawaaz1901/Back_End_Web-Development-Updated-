import mongoose, { mongo } from "mongoose";

export const likeSchema = new mongoose.Schema({
  /* Storing useId which like the Product or Category */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  /* 
        We can't Directly Specify the Product and Category attribute because 
        if user Like the Product then we need to reffer the to the product
        collection or if user like the category then we need to reffer to 
        the category collection so we use word likeable which can't specify
        a product or category. In likeable we store the type which is id because
        product and category both have id. because we dont know user like the 
        product or category so that so we cant directly reffer to a specific
        collection so we need a keyword which we use to define another attribute
        which is enum which decide in which collection we want to store the document
        and the collection name is string so that we specify the type which is string
    */
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "on_model", // on_model is string which we need to create as seprate attribute
  },
  on_model: {
    type: String,
    enum: ["Product", "Category"],
    required: true,
  },
})
  /* 
    Middleware of pre is written after the schema is created it takes one 
    is operation and next is callback which takes one argument which is 
    next function which we use to call the next middleware in the pipeline
    pre function is called before a specific operation which we pass is 
    going to execute
*/
  .pre("save", (next) => {
    console.log("Inside the Pre function !");
    next();
  })
  /* 
    Post function is called after the specific operation which we pass is 
    completed, and is takes one callback along with the operation name which
    takes one argument which is the document which we use to do the operation
    because save is the document middleware function so it takes the document
*/
  .post("save", (doc) => {
    console.log("Inside the Post function !");
    console.log(doc);
  })
  //* Calling before the find function
  .pre("find", (next) => {
    console.log("Retrieving the Like");
    next(); //* If not calling the next function then our after starting the find operation stuck and never ended because it stuck in the
  })

  //* Calling After the Find function Completes the Operation
  .post("find", (doc) => {
    console.log(doc);
    console.log("Post finded");
  });
