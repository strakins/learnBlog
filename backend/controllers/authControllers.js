import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';

export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password || username === ''|| email === '' || password === '') {
        return res.status(400).json({message: "Please fill all fields"})
    }

    const newUser = new User({
        username, 
        email, 
        password
    });

    try {
        await newUser.save();
        res.json('Signup Successful')
    } catch (error) {
        res.status(500).json({message: error.message})
    }

} 