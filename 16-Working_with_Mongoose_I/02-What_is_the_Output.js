/*
Enstablishing a MongoDB Connection with Mongoose

You are developing a Node.js application that requires a connetion to a 
MongoDB database using Mongoose. Which of the following code snippets 
demonstrates the correct way to establish this connection .? 
Select all the correct Options .? ( Multiple )

A.
import mongoose from "mongoose"
export const connectUsignMongoose = async()=>{
    try{
        await mongoose.connect("mongodb:localhost:27017")
        console.log("MongoDB connected using mongoose")
    }catch(err){
        console.log(err)
    }
}

B.
import mongoose from "mongoose"
export const connectUsignMongoose = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017",{
            useNewParser : true,
            useUnifiedTopology : true
        })
        console.log("MongoDB connected using mongoose")
    }catch(err){
        console.log(err)
    }
}

C.
import mongoose from "mongoose"
export const connectUsignMongoose = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017",{
            useNewUrlParser : true,
            useUnifiedTopoplogy : true
        })
        console.log("MongoDB connected using mongoose")
    }catch(err){
        console.log(err)
    }
}

D.
import mongoose from "mongoose"
export const connectUsignMongoose = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017")
        console.log("MongoDB connected using mongoose")
    }catch(err){
        console.log(err)
    }
}


1. A
2. B
3. C                        //* Correct
4. D                        //* Correct

Solution Description : C and D correctly establish a MongoDB connection using Mongoose 
            with async/await. "useNewUrlParser" ans "useUnifiedTopology" are optional 
            connection options. A and B incorrect because the wrong connectin string 
            and "useNewParser" are not an option.
*/
