import express from 'express';
import {
  createJobController,
  deleteJobController,
  getAlljobsController,
  updateJobController,
} from '../controllers/jobsController.js';
import userAuth from '../middelwares/authMiddleware.js';

const router = express.Router();

//routes

//create job || post

router.post('/create', userAuth, createJobController);

//get jobs || get
router.get('/get', userAuth, getAlljobsController);

//update jobs || put || patch
router.patch('/update/:id', userAuth, updateJobController);

//delete jobs || delete
router.delete('/delete/:id', userAuth, deleteJobController);

export default router;
