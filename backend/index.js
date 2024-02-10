import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoutes.js';
import authRoute from './routes/authRoutes.js';
import postRoute from './routes/postRoutes.js';
import commentRoute from './routes/commentRoutes.js';
import cookieParser from 'cookie-parser';
// Set up dynamic folder structure for render to pick each folder
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongDB Database Connected Succesfully')
    })
    .catch((err) => {
        console.log(err)
    })

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server Running on port 3000')
})


app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);
app.use('/api/comment', commentRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});