
const express = require("express");
const router = express.Router();
const Profile = require("../models/profile");

// CREATE PROFILE
router.post("/profile", async (req, res) => {
  try {
    const candidate = await Profile.create(req.body);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: candidate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;