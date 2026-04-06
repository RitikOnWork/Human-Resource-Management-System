const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    vacancies: { type: Number, required: true, min: 1 },
    eligibility_rules: { type: String, default: "" },
    status: { type: String, enum: ["open", "closed"], default: "open" },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
