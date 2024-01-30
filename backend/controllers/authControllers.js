import { errorHandler } from '../utils/error.js';
import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; 

export const signUp = async (req, res, next) => {
    const {username, email, password} = req.body;
    if ( 
        !username || 
        !email || 
        !password || 
        username === ''|| 
        email === '' || 
        password === ''
    ) { 
        next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username, 
        email, 
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.json(`Signup Successful for ${email}`)
    } catch (error) {
        next(error);
    }

} 

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All Fields are required'))
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
           return next(errorHandler(404, 'Invalid Credentials'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) {
            return next(errorHandler(400, 'Invalid Credentials'))
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        
        const {password: pass, ...rest} = validUser._doc

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            // sameSite: 'strict',
        }).json(rest)
        
     } catch (error) {
        next(error)
    }
};

export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({email});
        if(user) {
            const token = jwt.sign({id: user_id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 12)
            const newUser = new User ({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res 
              .status(200)
              .cookie('acccess_token', token, {
                httpOnly: true,
              })
              .json(rest)
            

        }
    } catch (error) {
        
    }
}
