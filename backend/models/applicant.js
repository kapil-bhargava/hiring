const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "job",
    required: true,
  },

  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidate",
    required: true,
  },

  /* 🔥 SNAPSHOT DATA */
  snapshot: {
    name: String,
    email: String,
    phone: String,
    location: String,

    education: {
      degree: String,
      university: String,
      startYear: String,
      endYear: String,
    },

    experience: {
      role: String,
      company: String,
      startDate: String,
      endDate: String,
    },

    skills: [String],

    resume: {
      fileName: String,
      fileUrl: String,
    },
    profilePic: {
      fileName: String,
      fileUrl: String,
    },
  },

  status: {
    type: String,
    enum: ["pending", "shortlisted", "rejected"],
    default: "pending",
  },

  appliedAt: { type: Date, default: Date.now },
  shortlistedAt: { type: Date, default: Date.now },
  rejectedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("applicant", applicantSchema);