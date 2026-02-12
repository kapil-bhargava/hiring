const mongoose = require("mongoose");

/**
 * Candidate Schema
 * ----------------
 * - Stores full candidate profile
 * - One-to-one mapping with Signup
 */
// candidate.model.js
const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "signup",
      required: true,
      unique: true,
    },

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

    skills: { type: [String], default: [] },

    resume: {
      fileName: String,
      fileUrl: String,
      uploadedAt: Date,
    },
    profilePic: {
      fileName: String,
      fileUrl: String,
      uploadedAt: Date,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("candidate", candidateSchema);
