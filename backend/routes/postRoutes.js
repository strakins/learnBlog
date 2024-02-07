import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getPosts, deletePost, updatepost,  } from '../controllers/postControllers.js';
 
const router = express.Router();

router.post('/create', verifyToken, create);
router.get('/getposts', getPosts);
// router.put('/updatepost/:postId/:userId', verifyToken, updatepost);
router.put('/updatepost/:postId/:userId', verifyToken, updatepost)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePost);


export default router;