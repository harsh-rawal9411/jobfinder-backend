import express from "express";
import { createJob, getAllJobs, getMyJobs, updateJob, deleteJob, getJobById } from "../controllers/jobController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import checkRole from "../middlewares/roleMiddleware.js";

const router = express.Router();

// public
router.get("/", getAllJobs);

// employer routes
router.post("/create", authMiddleware, checkRole("employer"), createJob);
router.get("/my-jobs", authMiddleware, checkRole("employer"), getMyJobs);
router.put("/:id", authMiddleware, checkRole("employer"), updateJob);
router.delete("/:id", authMiddleware, checkRole("employer"), deleteJob);
router.get("/:id", authMiddleware, getJobById);

export default router;
