const express = require("express");
const router = express.Router();
const { requireRole } = require("../middleware/auth");
const Job = require("../models/Job");
const Application = require("../models/Application");
const Employee = require("../models/Employee");

// All admin routes require admin role
router.use(requireRole("admin"));

// GET /api/admin/dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/create-job
router.post("/create-job", async (req, res) => {
  try {
    const { title, department, location, vacancies, eligibility_rules } = req.body;

    if (!title || !department || !location || !vacancies) {
      return res.status(400).json({ error: "Title, department, location, and vacancies are required" });
    }

    const job = await Job.create({
      title,
      department,
      location,
      vacancies: Number(vacancies),
      eligibility_rules: eligibility_rules || "",
      created_by: req.session.userId,
    });

    res.status(201).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/admin/job/:jobId/applications
router.get("/job/:jobId/applications", async (req, res) => {
  try {
    const applications = await Application.find({ job: req.params.jobId })
      .populate("candidate", "name email")
      .populate("job", "title department");

    const formatted = applications.map((app) => ({
      application_id: app._id,
      candidate_name: app.candidate?.name || "Unknown",
      email: app.candidate?.email || "",
      status: app.status,
      job_title: app.job?.title || "",
      department: app.job?.department || "",
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/admin/application/:applicationId/shortlist
router.post("/application/:applicationId/shortlist", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.applicationId,
      { status: "shortlisted" },
      { new: true }
    );
    if (!application) return res.status(404).json({ error: "Application not found" });
    res.json({ success: true, application });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
