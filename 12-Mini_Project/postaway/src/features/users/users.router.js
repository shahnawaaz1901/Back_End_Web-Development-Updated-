import express from 'express';

const usersRouter = express.Router();

usersRouter.use('/ragister').post();
usersRouter.use('/login').post();
usersRouter.use('/logout').get();

export default usersRouter;