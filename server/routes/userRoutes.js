import express from 'express';
import { login, register } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post("/register", register); //Register
userRouter.post("/login", login); //Login

export default userRouter;