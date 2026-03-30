require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Employee = require("./models/Employee");
const Department = require("./models/Department");
const Job = require("./models/Job");
const Attendance = require("./models/Attendance");
const LeaveRequest = require("./models/LeaveRequest");

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Employee.deleteMany({}),
    Department.deleteMany({}),
    Job.deleteMany({}),
    Attendance.deleteMany({}),
    LeaveRequest.deleteMany({}),
  ]);
  console.log("Cleared existing data");

  // Create users
  const admin = await User.create({
    name: "Admin User",
    email: "admin@hrms.com",
    password: "admin123",
    role: "admin",
  });

  const hr = await User.create({
    name: "HR Manager",
    email: "hr@hrms.com",
    password: "hr123",
    role: "hr",
  });

  const emp1 = await User.create({
    name: "John Smith",
    email: "john@hrms.com",
    password: "emp123",
    role: "employee",
  });

  const emp2 = await User.create({
    name: "Sarah Johnson",
    email: "sarah@hrms.com",
    password: "emp123",
    role: "employee",
  });

  const candidate = await User.create({
    name: "Mike Wilson",
    email: "mike@gmail.com",
    password: "candidate123",
    role: "candidate",
  });

  console.log("Created users");

  // Create departments
  const departments = await Department.insertMany([
    { name: "Engineering", description: "Software development and engineering" },
    { name: "Human Resources", description: "HR and people operations" },
    { name: "Marketing", description: "Marketing and communications" },
    { name: "Finance", description: "Finance and accounting" },
    { name: "Operations", description: "Business operations" },
  ]);
  console.log("Created departments");

  // Create employees
  const employee1 = await Employee.create({
    user: emp1._id,
    employee_code: "EMP001",
    department: "Engineering",
    designation: "Senior Developer",
    pay_grade: "A",
    date_of_joining: new Date("2024-01-15"),
  });

  const employee2 = await Employee.create({
    user: emp2._id,
    employee_code: "EMP002",
    department: "Marketing",
    designation: "Marketing Lead",
    pay_grade: "B",
    date_of_joining: new Date("2024-03-01"),
  });

  const hrEmployee = await Employee.create({
    user: hr._id,
    employee_code: "EMP003",
    department: "Human Resources",
    designation: "HR Manager",
    pay_grade: "A",
    date_of_joining: new Date("2023-06-01"),
  });

  console.log("Created employees");

  // Create jobs
  const jobs = await Job.insertMany([
    {
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      vacancies: 3,
      eligibility_rules: "3+ years experience with React and Node.js",
      status: "open",
      created_by: admin._id,
    },
    {
      title: "UX Designer",
      department: "Engineering",
      location: "New York",
      vacancies: 1,
      eligibility_rules: "Portfolio required, Figma proficiency",
      status: "open",
      created_by: admin._id,
    },
    {
      title: "Marketing Intern",
      department: "Marketing",
      location: "San Francisco",
      vacancies: 2,
      eligibility_rules: "Currently enrolled in university",
      status: "open",
      created_by: admin._id,
    },
  ]);
  console.log("Created jobs");

  // Create attendance records (last 7 days for employees)
  const attendanceRecords = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    for (const emp of [employee1, employee2, hrEmployee]) {
      const checkIn = new Date(date);
      checkIn.setHours(9, Math.floor(Math.random() * 30), 0);
      const checkOut = new Date(date);
      checkOut.setHours(17 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);

      attendanceRecords.push({
        employee: emp._id,
        date,
        check_in: checkIn,
        check_out: checkOut,
        status: Math.random() > 0.15 ? "present" : "late",
      });
    }
  }
  await Attendance.insertMany(attendanceRecords);
  console.log("Created attendance records");

  // Create leave requests
  await LeaveRequest.insertMany([
    {
      employee: employee1._id,
      user: emp1._id,
      leave_type: "annual",
      start_date: new Date("2026-04-10"),
      end_date: new Date("2026-04-14"),
      reason: "Family vacation",
      status: "pending",
    },
    {
      employee: employee2._id,
      user: emp2._id,
      leave_type: "sick",
      start_date: new Date("2026-03-25"),
      end_date: new Date("2026-03-26"),
      reason: "Not feeling well",
      status: "approved",
      reviewed_by: hr._id,
    },
    {
      employee: hrEmployee._id,
      user: hr._id,
      leave_type: "casual",
      start_date: new Date("2026-04-01"),
      end_date: new Date("2026-04-01"),
      reason: "Personal work",
      status: "pending",
    },
  ]);
  console.log("Created leave requests");

  console.log("\n--- Seed Complete ---");
  console.log("Login credentials:");
  console.log("  Admin:     admin@hrms.com / admin123");
  console.log("  HR:        hr@hrms.com / hr123");
  console.log("  Employee:  john@hrms.com / emp123");
  console.log("  Employee:  sarah@hrms.com / emp123");
  console.log("  Candidate: mike@gmail.com / candidate123");

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
