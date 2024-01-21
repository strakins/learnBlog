import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';


dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongDB Database Connected Succesfully')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log('Server Running on port 3000')
})


app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.stats(statusCode).json({
        success: false,
        statusCode,
        message
    })
})