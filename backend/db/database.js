import mongoose from 'mongoose';
import dotenv from 'dotenv'

//dotenv.config({path : 'D:\intern project\EduFlex\backend\.env'});

const DB_URI = 'mongodb+srv://kapilCoursella123:rH91WvmqQxBfytya@users.zmyaiem.mongodb.net/COURSELLA'

const connectDB = () => {
    mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("database connected");
    }).catch((err) => {
        console.log(err);
    })
}

export default connectDB
