import User from "../models/user.js"
import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    const name = req.body.name;
    let password = req.body.password;
    password = await bcrypt.hash(password, 10);
    const db = new User({name, password});
    try {
        await db.save();
        res.json( {
        message: "user created with success!"
    } );
    } catch(err) {
        res.json( {
            message: "Failed to create user!"
        } )
    }   
}

const login = async (req, res) => {
    const name = req.body.name;
    let password = req.body.password;
    const tokenKey = process.env.JWT_KEY;
    const user = await User.findOne( {name} );

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid || !user) return res.status(401).json({message: "Wrong data!"});
    const accessToken = jwt.sign(
        {name},
        tokenKey,
        {expiresIn: "1h", algorithm: "HS256"}
    );
    const refreshToken = jwt.sign(
        {name},
        tokenKey,
        {expiresIn: "1d", algorithm: "HS256"}
    );

    return res.status(200).json( {
        accessToken,
        refreshToken
    } );
}

const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const privateKey = process.env.JWT_KEY;
    
    if(jwt.verify(refreshToken, privateKey)) {
        const decoded = jwt.decode(refreshToken)
        const name = decoded.name;
        console.log(name);
        const accessToken = jwt.sign( 
            {name},
            privateKey,
            {expiresIn: "1h", algorithm: "HS256"}
        );
        
        return res.status(200).json( {accessToken} );
    }

    return res.status(403).json( {message: "Tokens expired!"} );
}

export { registerUser, login, refreshToken };