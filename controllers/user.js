import User from "../models/user.js"
import bcrypt from 'bcrypt';

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

export { registerUser };