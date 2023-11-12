//** Import Nessesory Modules */

//? Packages or External Modules
import express from "express";

//? Internal Modules
import usersRouter from "./src/features/users/users.router.js";
import postsRouter from "./src/features/posts/posts.router.js";
import likesRouter from "./src/features/likes/likes.router.js";
import commentsRouter from "./src/features/comments/comments.router.js";
import auth from "./src/middlewares/basic-auth.middleware.js";

//* Start the Server */
const server = express();

//* Setting Up Middlewares */
//? For Populating req.body in POST Request
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//* Setting Up Routes */
server.use("/api/users", usersRouter);
server.use("/api/posts", auth, postsRouter);
server.use("/api/likes", auth, likesRouter);
server.use("/api/comments", auth, commentsRouter);

//* Listen the Server
server.listen(3200, (err) => {
  if (err) {
    console.log(`Error While Listening the Server : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port 3200`);
});
