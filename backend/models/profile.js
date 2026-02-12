const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    // ===== Basic Info =====
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String, // Frontend Developer Intern
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
    },

    location: {
      type: String,
    },

    // ===== Education =====
    education: {
      degree: String,
      university: String,
      startYear: String,
      endYear: String,
    },

    // ===== Experience =====
    experience: {
      role: String,
      company: String,
      startDate: String,
      endDate: String, // "Present"
    },

    // ===== Professional Details =====
    skills: [
      {
        type: String,
      },
    ],

    experienceLevel: {
      type: String, // Fresher / Intern
      enum: ["Fresher", "Intern", "Experienced"],
    },

    // ===== Profile Links =====
    github: {
      type: String,
    },

    linkedin: {
      type: String,
    },

    // ===== Resume Upload =====
    resume: {
      fileName: String,      // resume.pdf
      fileUrl: String,       // /uploads/resume.pdf OR cloud URL
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("profile", profileSchema);