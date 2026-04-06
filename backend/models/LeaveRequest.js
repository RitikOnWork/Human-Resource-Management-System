const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    leave_type: {
      type: String,
      enum: ["sick", "casual", "annual", "maternity", "paternity", "unpaid"],
      required: true,
    },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    reviewed_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaveRequest", leaveRequestSchema);
