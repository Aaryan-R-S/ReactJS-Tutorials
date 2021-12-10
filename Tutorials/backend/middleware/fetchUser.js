const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Thanks Harry for this lovely project!';

const fetchUser = (req, res, next)=>{
    // Get the user with the help of jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();
    } catch (error) {
        return res.status(401).send({error:"Invalid auth token"})
    }
}

module.exports = fetchUser;