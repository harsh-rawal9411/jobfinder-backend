import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check duplicate application
        const existing = await Application.findOne({
            jobId,
            userId: req.user.id
        });

        if (existing) {
            return res.status(400).json({ message: "You already applied for this job" });
        }

        // Create application
        const application = await Application.create({
            jobId,
            userId: req.user.id
        });

        res.status(201).json({
            message: "Application submitted",
            application
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



export const getMyApplications = async (req, res) => {
    try {
        const apps = await Application.find({ userId: req.user.id })
            .populate("jobId");

        res.json(apps);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export const getApplicationsForMyJobs = async (req, res) => {
    try {
        const employerId = req.user.id;

        // Find all jobs created by employer
        const jobs = await Job.find({ createdBy: employerId });

        const jobIds = jobs.map(job => job._id);

        // Find applications for those jobs
        const apps = await Application.find({ jobId: { $in: jobIds } })
            .populate("jobId")
            .populate("userId", "name email");

        res.json(apps);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
