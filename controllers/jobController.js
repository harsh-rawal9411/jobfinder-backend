import Job from "../models/Job.js";

export const createJob = async (req, res) => {
    try {
        const { title, description, salary, location, companyName } = req.body;

        const job = await Job.create({
            title,
            description,
            salary,
            location,
            companyName,
            createdBy: req.user.id // EMPLOYER ID
        });

        res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
         console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAllJobs = async(req, res) => {
    try {
const jobs = await Job.find().sort({createdAT: -1})
res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user.id });
        res.json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findOne({ _id: jobId, createdBy: req.user.id });

        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized" });
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

        res.json({ message: "Job updated", updatedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};


export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findOne({ _id: jobId, createdBy: req.user.id });

        if (!job) {
            return res.status(404).json({ message: "Job not found or unauthorized" });
        }

        await job.deleteOne();

        res.json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.json(job);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
