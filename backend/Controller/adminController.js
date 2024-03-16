import express from 'express'
import Admin from '../Models/AdminModel.js'
//import Course from '../Models/CourseModel.js'
import jwt from 'jsonwebtoken'
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import storage from '../db/firebase.js';
// import Video from '../Models/Video.js';
// import multer from 'multer';


const app = express();
app.use(express.json());

export const signUp = (req, res) => {
    const { username, email, password } = req.body;
    function callback(admin) {
      if (admin) {
        res.status(403).json({ message: 'Admin already exists' });
      } else {
        const obj = { username: username, password: password, email };
        const newAdmin = new Admin(obj);
        newAdmin.save();
        const adminJSON = {
          username : username,
          email : email,
          role : "ADMIN",
        }
        const token = jwt.sign(adminJSON, "8ZBD38wl6QwAhZvOC5PCxwZbpz9MaDjGLw9ljAMACkcdpq3LzdZw4zRDAbG2Ub5E", {expiresIn : '1h'});
        res.json({ message: 'Admin created successfully', token });
      }
  
    }
    Admin.findOne({ email }).then(callback);
  };
  
export const login = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });
    if (admin) {
      const adminJSON = {
        username : admin.username,
        email : email,
        role : "ADMIN",
      }
      const token = jwt.sign(adminJSON, "8ZBD38wl6QwAhZvOC5PCxwZbpz9MaDjGLw9ljAMACkcdpq3LzdZw4zRDAbG2Ub5E", {expiresIn : '1h'});
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  };
  
