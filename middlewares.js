import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateJwt = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const privateKey = process.env.JWT_KEY;
    let token;

    if(!authHeader) return res.status(401).json({message: "No Authorization on header"});

    const parts = authHeader.split(' ');
    if(parts.length !== 2) return res.status(401).json("No Authorization on header");
    token = parts[1];
    
    jwt.verify(token, privateKey, (err, user) => {
        if(err) return res.json({message: "Invalid Token!"});
        req.user = user;
        next();
    })
}

export { authenticateJwt };