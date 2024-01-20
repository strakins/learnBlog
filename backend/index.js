import express from 'express';
import mongoose  from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(
    process.env.MONGODB_URI
    )
    .then(() => {
        console.log('MongDB Database Connected Succesfully')
    })
    .catch((err) => {
        console.log(err)
    })

const app = express();

app.listen(3000, () => {
    console.log('Server Running on port 3000')
})