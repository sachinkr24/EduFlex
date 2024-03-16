
import jwt from 'jsonwebtoken'


//dotenv.config({path : 'D:/EduFlex/backend/.env'});


export const authenticateAdminJWT = (req, res, next) => {
    const authHead = req.headers.authorization;
    if(authHead){
        const token = authHead.split(' ')[1];
        jwt.verify(token, "8ZBD38wl6QwAhZvOC5PCxwZbpz9MaDjGLw9ljAMACkcdpq3LzdZw4zRDAbG2Ub5E", (err, admin) => {
            if(err) {
                return;
            }
            req.admin = admin;
            next();
        })
    } else {
        res.status(401);
    }

}