import express from 'express';
import userAuth from "../middlewares/authMiddleware.js";
import { applyJob, createJob, deleteJobPost, getJobById, getJobPosts, getUserJobApplications, updateJob } from '../controllers/jobController.js';



const router = express.Router();

router.post("/upload-job", userAuth, createJob);
router.put("/update-job/:jobId", userAuth, updateJob);

router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

router.delete("/delete-job/:id", userAuth, deleteJobPost);

router.post("/apply-job", userAuth, applyJob);

router.get("/get-user-job-applications", userAuth, getUserJobApplications);

export default router;
