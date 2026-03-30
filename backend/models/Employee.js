const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    employee_code: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    pay_grade: { type: String, required: true },
    date_of_joining: { type: Date, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
