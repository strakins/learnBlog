import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getPosts } from '../controllers/postControllers.js';
 
const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getPosts);


export default router;