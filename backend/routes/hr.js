const express = require("express");
const router = express.Router();
const { requireRole } = require("../middleware/auth");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Department = require("../models/Department");
const Attendance = require("../models/Attendance");
const LeaveRequest = require("../models/LeaveRequest");
const Application = require("../models/Application");

// All HR routes require hr or admin role
router.use(requireRole("hr", "admin"));

// GET /api/hr/user
router.get("/user", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hr/employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hr/departments
router.get("/departments", async (req, res) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    res.json({ departments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hr/attendance
router.get("/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate({
        path: "employee",
        populate: { path: "user", select: "name email" },
      })
      .sort({ date: -1 })
      .limit(100);
    res.json({ attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hr/leave-requests
router.get("/leave-requests", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find()
      .populate("user", "name email")
      .populate("employee", "employee_code department designation")
      .populate("reviewed_by", "name")
      .sort({ createdAt: -1 });
    res.json({ leaveRequests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/hr/stats
router.get("/stats", async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ status: "active" });
    const totalDepartments = await Department.countDocuments();
    const pendingLeaves = await LeaveRequest.countDocuments({ status: "pending" });
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);
    const presentToday = await Attendance.countDocuments({
      date: { $gte: todayStart, $lte: todayEnd },
      status: "present",
    });

    res.json({
      stats: {
        totalEmployees,
        totalDepartments,
        pendingLeaves,
        presentToday,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/hr/leave-requests/:id/approve
router.post("/leave-requests/:id/approve", async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: "approved", reviewed_by: req.session.userId },
      { new: true }
    );
    if (!leave) return res.status(404).json({ error: "Leave request not found" });
    res.json({ success: true, leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/hr/leave-requests/:id/reject
router.post("/leave-requests/:id/reject", async (req, res) => {
  try {
    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id,
      { status: "rejected", reviewed_by: req.session.userId },
      { new: true }
    );
    if (!leave) return res.status(404).json({ error: "Leave request not found" });
    res.json({ success: true, leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/hr/create-employee
router.post("/create-employee", async (req, res) => {
  try {
    const { candidate_id, employee_code, department, designation, pay_grade, date_of_joining } = req.body;

    if (!candidate_id || !employee_code || !department || !designation || !pay_grade || !date_of_joining) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findById(candidate_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const existingEmployee = await Employee.findOne({ user: candidate_id });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee record already exists for this user" });
    }

    // Update user role to employee
    user.role = "employee";
    await user.save();

    // Create employee record
    const employee = await Employee.create({
      user: candidate_id,
      employee_code,
      department,
      designation,
      pay_grade,
      date_of_joining,
    });

    // Ensure department exists
    await Department.findOneAndUpdate(
      { name: department },
      { name: department },
      { upsert: true }
    );

    res.status(201).json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
