//** Import Nessesory Modules */

//? Packages or External Modules
import express from "express";

//? Internal Modules

/* Routers */
import usersRouter from "./src/features/users/users.router.js";
import postsRouter from "./src/features/posts/posts.router.js";
import likesRouter from "./src/features/likes/likes.router.js";
import commentsRouter from "./src/features/comments/comments.router.js";

/* Authentication */
import auth from "./src/middlewares/basic-auth.middleware.js";
import jwtAuth from "./src/middlewares/jwt-auth.middleware.js";

/* Error Handling & Logging*/
import ApplicationError from "./src/features/error/application.error.js";
import { logger } from "./src/middlewares/winston-logger.middleware.js";

/* CORS Policy */
import cors from "cors";

/* API Documentation */
import swagger from "swagger-ui-express";
import apiDocs from "./swagger.json" assert { type: "json" };
/* 
  assert keyword require to import json file because it indicates that the have'nt
  import a package or module we import a json file so in type we specify the json
*/

//* Start the Server */
const server = express();

//* Setting Up Middlewares */

//? For Cross Origin Request
server.use(
  cors({
    origin: "0.0.0.0",
    allowedHeaders: "*",
  })
);

//? For Populating req.body in POST Request
/* 
  extended : true gives us the prototype of the object along with req.body 
  which is not useful for us 
*/
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

/* Logging Request */
server.use(logger);

//* Setting Up Routes */
/* 
  "/apiDocs" is the path swagger.serve server a front end ui to the user and 
  swagger.setup is a function which takes JSON object where we need to pass
  our swagger.json file which contain all information regarding our API.
  So we can say serve build and show the front end to the user and setup function
  fill the front end with the information of API which we write in JSON file
*/
server.use("/apiDocs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/users", usersRouter);
server.use("/api/posts", jwtAuth, postsRouter);
server.use("/api/likes", jwtAuth, likesRouter);
server.use("/api/comments", jwtAuth, commentsRouter);

//* Error Handler at Application Level
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).send(err.message);
  }

  res.status(500).send("Internal Server Error");
});

//* Default Route
server.use((req, res) => {
  res.status(404).send("Please Read Our Docs !!");
});

//* Listen the Server
server.listen(3200, (err) => {
  if (err) {
    console.log(`Error While Listening the Server : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port 3200`);
});
