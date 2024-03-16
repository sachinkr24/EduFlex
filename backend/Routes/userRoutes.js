// Desc: user routes
import express from "express";
import {signUp, login, considerableCourses, purchaseCourse, allBuyings, updateRating, freeCourses} from '../Controller/userController.js'
import authenticateUserJWT from '../Authentication/userAuth.js'
import { me } from "../Controller/adminController.js";

const app = express();

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/login', login);
userRouter.get('/courses', authenticateUserJWT, considerableCourses);
userRouter.post('/courses/:courseId', authenticateUserJWT, purchaseCourse);
userRouter.get('/purchasedCourses', authenticateUserJWT, allBuyings);
userRouter.post('/updateRating', authenticateUserJWT, updateRating);
userRouter.get('/me', authenticateUserJWT, me);
userRouter.get('/freecourses', authenticateUserJWT, freeCourses)


export default userRouter;