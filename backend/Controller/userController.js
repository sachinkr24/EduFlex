import express from 'express'
import Users from '../Models/UserModel.js'
//import Course from '../Models/CourseModel.js'
import createUserToken from '../Authentication/jwtGenerator.js'
import jwt from 'jsonwebtoken'


const app = express();
app.use(express.json());


export const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await Users.findOne({ email }); 
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new Users({ username, email, password });
      await newUser.save();
      const userJSON = {
        username : username,
        email : email,
        role : "USER",
      }
      const token = jwt.sign(userJSON, "8ZBD38wl6QwAhZvOC5PCxwZbpz9MaDjGLw9ljAMACkcdpq3LzdZw4zRDAbG2Ub5E", {expiresIn : '1h'});
      res.json({ message: 'User created successfully', token });
    }
  };
  
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });
    if (user) {
      const userJSON = {
        username : user.username,
        email : email,
        role : "USER",
      }
      const token = jwt.sign(userJSON, "8ZBD38wl6QwAhZvOC5PCxwZbpz9MaDjGLw9ljAMACkcdpq3LzdZw4zRDAbG2Ub5E", {expiresIn : '1h'});
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  };
  
