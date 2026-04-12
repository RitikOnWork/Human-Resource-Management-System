const express = require("express");
const router = express.Router();
const { requireRole } = require("../middleware/auth");
const { exec } = require("child_process");
const path = require("path");
const User = require("../models/User");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const LeaveRequest = require("../models/LeaveRequest");

router.use(requireRole("employee", "hr", "admin"));

// POST /api/employee/payroll/calculate (Using Java Engine)
router.post("/payroll/calculate", async (req, res) => {
  try {
    const { baseSalary, taxRate } = req.body;
    
    if (!baseSalary || !taxRate) {
      return res.status(400).json({ error: "Salary and Tax Rate are required" });
    }

    const enginePath = path.join(__dirname, "../services/payroll-engine");
    const command = `java -cp "${enginePath}" PayrollEngine ${baseSalary} ${taxRate}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Java Engine Error:", stderr);
        return res.status(500).json({ error: "Payroll Engine Failed", details: stderr });
      }
      
      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (parseError) {
        res.status(500).json({ error: "Failed to parse engine output" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper for running Java Services synchronously via Promises
const runJavaEngine = (engineDir, className, argsStr) => {
  return new Promise((resolve, reject) => {
    const enginePath = path.join(__dirname, `../services/${engineDir}`);
    const command = `java -cp "${enginePath}" ${className} "${argsStr}"`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`${className} Error:`, stderr);
        return resolve({ status: "error", message: "Java Engine failed" });
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        resolve({ status: "error", message: "Parse error" });
      }
    });
  });
};

// GET /api/employee/dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const employee = await Employee.findOne({ user: req.session.userId });
    if (!employee) return res.status(404).json({ error: "Employee record not found" });

    const totalLeaves = await LeaveRequest.countDocuments({ employee: employee._id });
    const approvedLeaves = await LeaveRequest.countDocuments({ employee: employee._id, status: "approved" });
    const pendingLeaves = await LeaveRequest.countDocuments({ employee: employee._id, status: "pending" });

    // Performance history array 
    const performanceScores = [6.5, 7.0, 7.8, 8.2, 8.9, 9.2];
    const performanceHistory = performanceScores.map((score, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      return { month: date.toLocaleString("default", { month: "short" }), score };
    });

    // Run Java Engines
    const aiAnalysis = await runJavaEngine('performance-engine', 'PerformanceAIEngine', performanceScores.join(','));
    const attendanceStats = await runJavaEngine('attendance-engine', 'AttendanceEngine', "8.5,9.0,7.5,8.0,10.0,8.0,8.0,9.5,8.0,8.5");

    res.json({
      user: user.toJSON(),
      employee,
      stats: {
        totalLeaves,
        approvedLeaves,
        pendingLeaves,
        attendanceDaysThisMonth: attendanceStats.daysPresent || 0,
        javaAiAnalysis: aiAnalysis,
        javaAttendanceStats: attendanceStats
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
