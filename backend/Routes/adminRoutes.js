import express from "express";
import {signUp, login} from '../Controller/adminController.js';
import {authenticateAdminJWT} from '../Authentication/adminAuth.js';

const app = express();
const adminRouter = express.Router();


adminRouter.post('/signup', signUp);
adminRouter.post('/courses', authenticateAdminJWT);
adminRouter.post('/login', login);
adminRouter.get('/courses', authenticateAdminJWT);


export default adminRouter;