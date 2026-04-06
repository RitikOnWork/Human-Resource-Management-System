const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth");
const User = require("../models/User");
const Job = require("../models/Job");
const Application = require("../models/Application");

router.use(requireAuth);

// GET /api/candidate/dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/candidate/jobs
router.get("/jobs", async (req, res) => {
  try {
    const { search, location } = req.query;
    const filter = { status: "open" };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/candidate/apply
router.post("/apply", async (req, res) => {
  try {
    const { job_id } = req.body;

    if (!job_id) {
      return res.status(400).json({ error: "Job ID is required" });
    }

    const job = await Job.findById(job_id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    if (job.status !== "open") return res.status(400).json({ error: "Job is no longer accepting applications" });

    const existing = await Application.findOne({
      job: job_id,
      candidate: req.session.userId,
    });
    if (existing) {
      return res.status(400).json({ error: "You already applied for this job" });
    }

    const application = await Application.create({
      job: job_id,
      candidate: req.session.userId,
    });

    res.status(201).json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/candidate/applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find({ candidate: req.session.userId })
      .populate("job", "title department")
      .sort({ createdAt: -1 });

    const formatted = applications.map((app) => ({
      application_id: app._id,
      job_title: app.job?.title || "",
      department: app.job?.department || "",
      status: app.status,
      applied_on: app.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
