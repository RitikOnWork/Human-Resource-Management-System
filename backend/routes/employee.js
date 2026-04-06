const express = require("express");
const router = express.Router();
const { requireRole } = require("../middleware/auth");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const LeaveRequest = require("../models/LeaveRequest");

router.use(requireRole("employee", "hr", "admin"));

// GET /api/employee/dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const employee = await Employee.findOne({ user: req.session.userId });
    if (!employee) return res.status(404).json({ error: "Employee record not found" });

    // Get stats
    const totalLeaves = await LeaveRequest.countDocuments({ employee: employee._id });
    const approvedLeaves = await LeaveRequest.countDocuments({ employee: employee._id, status: "approved" });
    const pendingLeaves = await LeaveRequest.countDocuments({ employee: employee._id, status: "pending" });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const attendanceCount = await Attendance.countDocuments({
      employee: employee._id,
      date: { $gte: thirtyDaysAgo },
      status: "present",
    });

    // Performance history (last 6 months placeholder)
    const performanceHistory = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return {
        month: date.toLocaleString("default", { month: "short" }),
        score: Math.floor(Math.random() * 20) + 75,
      };
    });

    res.json({
      user: user.toJSON(),
      employee,
      stats: {
        totalLeaves,
        approvedLeaves,
        pendingLeaves,
        attendanceDaysThisMonth: attendanceCount,
      },
      performanceHistory,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/employee/apply-leave
router.post("/apply-leave", async (req, res) => {
  try {
    const { leave_type, start_date, end_date, reason } = req.body;

    if (!leave_type || !start_date || !end_date || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const employee = await Employee.findOne({ user: req.session.userId });
    if (!employee) return res.status(404).json({ error: "Employee record not found" });

    const leave = await LeaveRequest.create({
      employee: employee._id,
      user: req.session.userId,
      leave_type,
      start_date,
      end_date,
      reason,
    });

    res.status(201).json({ success: true, leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/employee/leave-history
router.get("/leave-history", async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.session.userId });
    if (!employee) return res.status(404).json({ error: "Employee record not found" });

    const leaves = await LeaveRequest.find({ employee: employee._id })
      .sort({ createdAt: -1 });

    res.json({ leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
