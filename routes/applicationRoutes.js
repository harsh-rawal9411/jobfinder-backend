import express from "express";
import { applyJob, getMyApplications, getApplicationsForMyJobs } from "../controllers/applicationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// job seeker routes
router.post("/:jobId/apply", authMiddleware, checkRole("jobseeker"), applyJob);
router.get("/my", authMiddleware, checkRole("jobseeker"), getMyApplications);

// employer routes
router.get("/employer", authMiddleware, checkRole("employer"), getApplicationsForMyJobs);

export default router;
