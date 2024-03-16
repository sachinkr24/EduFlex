
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config('../.env');


export const authenticateUserJWT = (req, res, next) => {
    const authHead = req.headers.authorization;
    if(authHead){
        const token = authHead.split(' ')[1];
        jwt.verify(token, "8ZBD38wl6QwAhZvOC5PCxwZbpz9MaDjGLw9ljAMACkcdpq3LzdZw4zRDAbG2Ub5E", (err, user) => {
            if(err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        })
    } else {
        res.status(401);
    }

}
export default authenticateUserJWT;