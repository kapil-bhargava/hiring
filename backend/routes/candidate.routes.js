const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidate");

/**
 * =================================================
 * CREATE OR UPDATE CANDIDATE PROFILE
 * =================================================
 * - First time: creates profile
 * - Next times: updates profile
 * - Uses userId as owner reference
 */
const bcrypt = require("bcryptjs");
const User = require("../models/signup"); // 👈 signup model

router.patch("/candidate/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        /* =========================
           1️⃣ UPDATE USER (NAME / PASSWORD)
        ========================== */
        let updatedUser = null;

        const userPayload = {};

        if (req.body.name) {
            userPayload.name = req.body.name;
        }

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            userPayload.password = await bcrypt.hash(req.body.password, salt);
        }

        if (Object.keys(userPayload).length > 0) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $set: userPayload },
                { new: true, runValidators: true }
            ).select("name email");
        }

        /* =========================
           2️⃣ UPDATE CANDIDATE PROFILE
        ========================== */
        const profilePayload = {
            phone: req.body.phone,
            location: req.body.location,
            education: req.body.education,
            experience: req.body.experience,
            skills: req.body.skills,
            github: req.body.github,
            linkedin: req.body.linkedin,
        };

        Object.keys(profilePayload).forEach(
            (key) =>
                profilePayload[key] === undefined && delete profilePayload[key]
        );

        const candidateProfile = await Candidate.findOneAndUpdate(
            { userId },
            {
                $set: profilePayload,
                $setOnInsert: { userId },
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
            }
        );

        /* =========================
           3️⃣ RESPONSE VARIABLE
        ========================== */
        const responseData = {
            name: updatedUser?.name || null,
            email: updatedUser?.email || null,
            phone: candidateProfile.phone || "",
            location: candidateProfile.location || "",
            education: candidateProfile.education || {},
            experience: candidateProfile.experience || {},
            skills: candidateProfile.skills || [],
            github: candidateProfile.github || "",
            linkedin: candidateProfile.linkedin || "",
            resume: candidateProfile.resume || null,
        };

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: responseData,
        });

    } catch (error) {
        console.error("Candidate profile save error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});



/**
 * =================================================
 * UPLOAD / REPLACE RESUME
 * =================================================
 * - First upload → creates candidate profile
 * - Re-upload → replaces resume
 * - Resume handled separately from profile data
 */
const resumeUpload = require("../middleware/uploadResume");

router.patch(
    "/candidate/resume/:userId",
    resumeUpload.single("resume"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "Resume file required" });
            }

            const resumeData = {
                fileName: req.file.originalname,
                fileUrl: `/uploads/resumes/${req.file.filename}`,
                uploadedAt: new Date(),
            };

            const profile = await Candidate.findOneAndUpdate(
                { userId: req.params.userId },
                { resume: resumeData },
                { new: true, upsert: true }
            );

            res.json({
                success: true,
                message: "Resume uploaded successfully",
                data: profile,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message || "Resume upload failed",
            });
        }
    }
);

/**
 * =================================================
 * UPLOAD / REPLACE PROFILE PICTURE
 * =================================================
 * - First upload → creates candidate profile (if not exists)
 * - Re-upload → replaces profile picture
 * - Profile picture handled separately from resume & profile data
 */
const profilePicUpload = require("../middleware/profilePicUpload");

router.patch(
    "/candidate/profile-pic/:userId",
    profilePicUpload.single("profilePic"),
    async (req, res) => {
        try {
            // 1️⃣ File validation
            if (!req.file) {
                return res.status(400).json({ message: "Profile picture file required" });
            }

            // 2️⃣ Prepare profile picture data
            const profilePicData = {
                fileName: req.file.originalname,
                fileUrl: `/uploads/profile-pics/${req.file.filename}`,
                uploadedAt: new Date(),
            };

            // 3️⃣ Update or create candidate profile
            const profile = await Candidate.findOneAndUpdate(
                { userId: req.params.userId },
                { profilePic: profilePicData },
                { new: true, upsert: true }
            );

            // 4️⃣ Success response
            res.json({
                success: true,
                message: "Profile picture uploaded successfully",
                data: profile,
            });
        } catch (error) {
            console.error("Profile picture upload error:", error.message);
            res.status(500).json({
                message: error.message || "Profile picture upload failed",
            });
        }
    }
);



/**
 * =================================================
 * GET CANDIDATE PROFILE BY USER ID
 * =================================================
 * - Fetch candidate profile using userId
 * - If not found → returns null (first-time user)
 */
router.get("/candidate/profile/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        // 1️⃣ Find candidate and populate user data
        const candidateProfile = await Candidate.findOne({ userId })
            .populate("userId", "name email");

        let profileData; // 👈 response variable

        // 2️⃣ First-time user (no candidate profile yet)
        if (!candidateProfile) {
            const user = await User.findById(userId).select("name email");

            profileData = {
                name: user?.name || "",
                email: user?.email || "",
                phone: "",
                location: "",
                education: {},
                experience: {},
                skills: [],
                github: "",
                linkedin: "",
                resume: null,
                profilePic: null,
            };
        } else {
            // 3️⃣ Existing candidate profile
            profileData = {
                name: candidateProfile.userId?.name || "",
                email: candidateProfile.userId?.email || "",
                phone: candidateProfile.phone || "",
                location: candidateProfile.location || "",
                education: candidateProfile.education || {},
                experience: candidateProfile.experience || {},
                skills: candidateProfile.skills || [],
                github: candidateProfile.github || "",
                linkedin: candidateProfile.linkedin || "",
                resume: candidateProfile.resume || null,
                profilePic: candidateProfile.profilePic || null,
            };
        }

        // 4️⃣ Send response
        return res.status(200).json({
            success: true,
            data: profileData,
        });

    } catch (error) {
        console.error("Get candidate profile error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


module.exports = router;
