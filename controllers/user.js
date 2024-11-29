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
    const token = jwt.sign(
        {name},
        tokenKey,
        {expiresIn: "1d", algorithm: "HS256"}
    );

    return res.status(200).json( {
        accessToken: token
    } );
}

export { registerUser, login };