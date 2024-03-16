import express from "express";
import {signUp, login, editCourse, me, courseWithId, uploadFile, deleteFile} from '../Controller/adminController.js';
import {authenticateAdminJWT} from '../Authentication/adminAuth.js';

const app = express();
const adminRouter = express.Router();


adminRouter.post('/signup', signUp);
adminRouter.post('/courses', authenticateAdminJWT);
adminRouter.post('/login', login);
adminRouter.get('/courses', authenticateAdminJWT);
adminRouter.put('/courses/:courseId', authenticateAdminJWT, editCourse);
adminRouter.get('/me', authenticateAdminJWT, me);
adminRouter.get('/courses/:courseId', authenticateAdminJWT, courseWithId);
adminRouter.post('/upload/video/:courseId', authenticateAdminJWT, uploadFile);
adminRouter.delete('/delete/video/:courseId', authenticateAdminJWT, deleteFile); 


export default adminRouter;