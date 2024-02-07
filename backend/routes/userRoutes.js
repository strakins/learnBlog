import express from 'express';
import { test, updateUser, deleteUser, signOut, getUsers, getUser } from '../controllers/userControllers.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.put('/update/:userId', verifyToken, updateUser)
router.post('/signout', signOut);
router.get('/getusers', verifyToken, getUsers)
router.delete('/delete/:userId', verifyToken, deleteUser);
router.get('/:userId', verifyToken, getUser);


export default router;