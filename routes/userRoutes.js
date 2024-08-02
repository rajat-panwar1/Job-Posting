import express from 'express';
import { updateUserController } from '../controllers/userController.js';
import userAuth from '../middelwares/authMiddleware.js';

//router object
const router = express.Router();

//routes
// get users || get

//update user || put
router.put('/update', userAuth, updateUserController);

export default router;
