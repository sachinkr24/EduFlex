// Desc: user routes
import express from "express";
import {signUp, login} from '../Controller/userController.js'
import authenticateUserJWT from '../Authentication/userAuth.js'

const app = express();

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
//userRouter.get('/courses', authenticateUserJWT, considerableCourses);


export default userRouter;