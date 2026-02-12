const mongoose = require("mongoose");

/**
 * Signup Schema
 * -------------
 * Purpose:
 * - Candidate authentication only
 * - Minimal & secure
 */
const signupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("signup", signupSchema);
