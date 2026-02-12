const express = require("express");
const router = express.Router();

// const Job = require("../models/applicant");
const Job = require("../models/job");
const Applicant = require("../models/applicant");
const Candidate = require("../models/candidate");
const Signup = require("../models/signup");
const formatDate = require("../utils/dateformatter");
const sendMail = require("../utils/mailer");
const { applicationStatusTemplate } = require("../utils/emailTemplates");


// creating job 
/**
 * POST: Apply for a job
 */
// router.post("/apply", async (req, res) => {
//     try {
//         const { jobId, candidateId } = req.body;

//         if (!jobId || !candidateId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "jobId and candidateId are required",
//             });
//         }

//         const candidate = await Candidate
//             .findOne({ userId: candidateId })
//             .populate("userId", "name email");

//         if (!candidate) {
//             return res.json({
//                 success: false,
//                 message: "Please create your profile",
//             });
//         }

//         if (!candidate.resume?.fileUrl) {
//             return res.json({
//                 success: false,
//                 message: "Please upload your resume before applying",
//             });
//         }

//         const alreadyApplied = await Applicant.findOne({
//             jobId,
//             candidateId: candidate._id,
//         });

//         if (alreadyApplied) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Already applied",
//             });
//         }

//         const job = await Job.findById(jobId).select("title location");

//         const application = await Applicant.create({
//             jobId,
//             candidateId: candidate._id,
//             status: "pending",
//             appliedAt: new Date(),
//         });

//         /* 📧 Confirmation Email */
//         try {
//             const user = candidate.userId;

//             if (user?.email) {
//                 await sendMail({
//                     to: user.email,
//                     subject: `Application Received – ${job.title}`,
//                     html: applicationStatusTemplate({
//                         name: user.name,
//                         jobTitle: job.title,
//                         status: "pending",
//                     }),
//                 });
//             }
//         } catch (emailError) {
//             console.error("Application email failed:", emailError.message);
//         }

//         res.status(200).json({
//             success: true,
//             message: "Job applied successfully",
//             data: application,
//         });

//     } catch (error) {
//         console.error("Apply job error:", error);
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// });

// latest 
router.post("/apply", async (req, res) => {
    try {
        const { jobId, candidateId } = req.body;
        // candidateId = signup._id (logged-in user)

        /* =================================================
           1️⃣ Basic validation
        ================================================= */
        if (!jobId || !candidateId) {
            return res.status(400).json({
                success: false,
                message: "jobId and candidateId are required",
            });
        }

        /* =================================================
           2️⃣ Fetch candidate profile + user details
           - Candidate is linked to signup via userId
           - Populate name & email for snapshot + email
        ================================================= */
        const candidate = await Candidate.findOne({ userId: candidateId })
            .populate("userId", "name email");

        if (!candidate) {
            return res.json({
                success: false,
                message: "Please create your profile",
            });
        }

        console.log("candidate is ", candidate)
        /* =================================================
           3️⃣ Ensure resume exists before applying
        ================================================= */
        if (!candidate.resume?.fileUrl) {
            return res.json({
                success: false,
                message: "Please upload your resume before applying",
            });
        }

        /* =================================================
           4️⃣ Prevent duplicate application
           - IMPORTANT: use candidate._id (not signup id)
        ================================================= */
        const alreadyApplied = await Applicant.findOne({
            jobId,
            candidateId: candidate._id,
        });

        if (alreadyApplied) {
            return res.status(409).json({
                success: false,
                message: "Already applied",
            });
        }

        /* =================================================
           5️⃣ Fetch job info (used for email + snapshot)
        ================================================= */
        console.log("job id is ", jobId)
        const job = await Job.findOne({ _id: jobId }).select("title location");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        /* =================================================
           6️⃣ CREATE APPLICATION WITH SNAPSHOT
           - Snapshot freezes candidate data at apply time
           - Future profile edits won't affect this record
        ================================================= */
        const application = await Applicant.create({
            jobId,
            candidateId: candidate._id,

            snapshot: {
                name: candidate.userId.name,
                email: candidate.userId.email,
                phone: candidate.phone,
                location: candidate.location,

                education: candidate.education,
                experience: candidate.experience,
                skills: candidate.skills,

                resume: {
                    fileName: candidate.resume.fileName,
                    fileUrl: candidate.resume.fileUrl,
                },
            },

            status: "pending",
            appliedAt: new Date(),
        });

        /* =================================================
           7️⃣ Send confirmation email (NON-BLOCKING)
           - Email failure must NOT break application flow
        ================================================= */
        try {
            const user = candidate.userId;

            if (user?.email) {
                await sendMail({
                    to: user.email,
                    subject: `Application Received – ${job.title}`,
                    html: applicationStatusTemplate({
                        name: user.name,
                        jobTitle: job.title,
                        status: "pending",
                    }),
                });
            }
        } catch (emailError) {
            console.error("Application email failed:", emailError.message);
        }

        /* =================================================
           8️⃣ Success response
        ================================================= */
        res.status(200).json({
            success: true,
            message: "Job applied successfully",
            data: application,
        });

    } catch (error) {
        console.error("Apply job error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});




/**
 * GET: Applicants by jobId 
*/
// getting all applicants for particular job
router.get("/applicants/:jobId", async (req, res) => {
    try {
        const { jobId } = req.params;
        // console.log(jobId)

        const applicants = await Applicant.find({ jobId })
            .populate("userId") // candidates details
            .populate("jobId", "title location");

        res.status(200).json({
            count: applicants.length,
            data: applicants,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message)
    }
});


// Get all applications for a particular candidate
router.get("/applications/:candidateId", async (req, res) => {
    try {
        const { candidateId } = req.params;

        // 1️⃣ Validate candidateId
        if (!candidateId) {
            return res.status(400).json({
                success: false,
                message: "Candidate ID is required",
            });
        }
        const candidate = await Candidate.find({ userId: candidateId });
        if (!candidate.length) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found",
            });
        }


        // console.log(candidate[0]._id)
        // 2️⃣ Fetch applications (FIXED QUERY + POPULATE)
        const applications = await Applicant.find({ candidateId: candidate[0]._id })
            .populate({
                path: "jobId",
                select: "title location",
            })
            .populate({
                path: "candidateId",
                select: "location resume",
                populate: {
                    path: "userId",
                    select: "name email",
                },
            })
            .lean();

        // 3️⃣ Empty state
        if (!applications.length) {
            return res.status(200).json({
                success: true,
                count: 0,
                message: "No applications found",
                data: [],
            });
        }

        // 4️⃣ Success response
        res.status(200).json({
            success: true,
            count: applications.length,
            data: applications,
        });
    } catch (error) {
        console.error("Get applications error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


// gettting all candidates for particular status
// router.get("/applicants/job/:status", async (req, res) => {
//     try {
//         const applicants = await Applicant.find({
//             status: req.params.status,
//         })
//             .populate("jobId", "title location")
//             .populate({
//                 path: "candidateId",
//                 select: "location skills resume profilePic userId phone experience education",
//                 populate: {
//                     path: "userId",
//                     select: "name email",
//                 },
//             });



//         res.status(200).json({
//             count: applicants.length,
//             data: applicants,
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// latest 
/**
 * @route   GET /api/applicants/job/:status
 * @desc    Get all applicants by status for admin panel
 * @note    Uses SNAPSHOT data instead of live candidate populate
 *          This ensures applicant profile does NOT change
 *          if candidate updates their profile later.
 */
router.get("/applicants/job/:status", async (req, res) => {
    try {
        const { status } = req.params;

        /**
         * Fetch applicants by status
         * - jobId is populated (job title & location are stable reference data)
         * - candidateId is NOT populated (important)
         * - snapshot contains frozen candidate info at apply-time
         */
        const applicants = await Applicant.find({ status })
            .populate("jobId", "title location")
            .select(
                "jobId status appliedAt snapshot createdAt updatedAt"
            )
            .sort({ appliedAt: -1 }); // latest first (UX improvement)

        /**
         * Response structure remains admin-friendly
         * Admin should always read candidate data from `snapshot`
         */
        res.status(200).json({
            success: true,
            count: applicants.length,
            data: applicants,
        });

    } catch (error) {
        console.error("Admin applicants fetch error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});



// gettinga all shortlisted candidates
// router.get("/shortlisted", async (req, res) => {
//     try {
//         const shortlisted = await Applicant.find({ status: "shortlisted" })
//             .populate("userId")
//             .populate("jobId", "title location");

//         res.status(200).json({
//             count: shortlisted.length,
//             data: shortlisted,
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error" });
//     }
// });



// latest 

/**
 * @route   GET /api/applicants/shortlisted
 * @desc    Get all shortlisted applicants (Admin)
 * @note    Uses SNAPSHOT data instead of populating candidate/user
 *          Snapshot guarantees profile data remains frozen
 *          as it was at the time of application.
 */
router.get("/shortlisted", async (req, res) => {
    try {
        /**
         * Fetch only shortlisted applicants
         * - DO NOT populate userId or candidateId
         * - jobId is safe to populate (reference data)
         */
        const shortlisted = await Applicant.find({ status: "shortlisted" })
            .populate("jobId", "title location")
            .select(
                "jobId status appliedAt snapshot createdAt updatedAt"
            )
            .sort({ appliedAt: -1 }); // latest first for admin UX

        res.status(200).json({
            success: true,
            count: shortlisted.length,
            data: shortlisted,
        });

    } catch (error) {
        console.error("Shortlisted applicants fetch error:", error);

        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});


// updating the status of candidate 

// router.put("/applicants/:id/status", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         const allowedStatus = ["pending", "shortlisted", "rejected"];
//         if (!allowedStatus.includes(status)) {
//             return res.status(400).json({ message: "Invalid status value" });
//         }

//         const updateData = { status };

//         // Proper Date handling
//         if (status === "shortlisted") {
//             updateData.shortlistedAt = new Date();
//             updateData.rejectedAt = null;
//         }

//         if (status === "rejected") {
//             updateData.rejectedAt = new Date();
//             updateData.shortlistedAt = null;
//         }

//         if (status === "pending") {
//             updateData.shortlistedAt = null;
//             updateData.rejectedAt = null;
//         }

//         const applicant = await Applicant.findByIdAndUpdate(
//             id,
//             updateData,
//             { new: true }
//         )
//             .populate("jobId", "title location")
//             .populate({
//                 path: "candidateId",
//                 populate: {
//                     path: "userId",
//                     select: "name email",
//                 },
//             });

//         if (!applicant) {
//             return res.status(404).json({ message: "Applicant not found" });
//         }

//         /* =====================================================
//            📧 SEND STATUS UPDATE EMAIL (NON-BLOCKING)
//         ===================================================== */
//         try {
//             const user = applicant?.candidateId?.userId;

//             if (!user?.email) {
//                 console.warn("⚠️ Email not sent: candidate email missing");
//             } else {
//                 await sendMail({
//                     to: user.email,
//                     subject: `Application Status Update – ${applicant.jobId.title}`,
//                     html: applicationStatusTemplate({
//                         name: user.name,
//                         jobTitle: applicant.jobId.title,
//                         status,
//                     }),
//                 });

//                 console.log(`📧 Status email sent to ${user.email}`);
//             }
//         } catch (emailError) {
//             // Email failure should NOT affect API success
//             console.error("❌ Status email failed:", emailError.message);
//         }
//         /* ===================================================== */

//         res.status(200).json({
//             message: "Status updated successfully",
//             data: applicant,
//         });

//     } catch (error) {
//         console.error("Status update error:", error);
//         res.status(500).json({ message: error.message });
//     }
// });

// latest 
/**
 * =================================================
 * UPDATE APPLICANT STATUS (Admin)
 * =================================================
 * - Updates application status
 * - Maintains proper timestamps
 * - Sends email using SNAPSHOT data
 * - Does NOT populate live candidate/user
 */
router.put("/applicants/:id/status", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        /* ===============================
           Validate status value
        =============================== */
        const allowedStatus = ["pending", "shortlisted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value",
            });
        }

        /* ===============================
           Prepare update payload
        =============================== */
        const updateData = { status };

        if (status === "shortlisted") {
            updateData.shortlistedAt = new Date();
            updateData.rejectedAt = null;
        }

        if (status === "rejected") {
            updateData.rejectedAt = new Date();
            updateData.shortlistedAt = null;
        }

        if (status === "pending") {
            updateData.shortlistedAt = null;
            updateData.rejectedAt = null;
        }

        /* ===============================
           Update applicant
           - Only populate job (safe)
        =============================== */
        const applicant = await Applicant.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
            .populate("jobId", "title location")
            .select("status jobId snapshot appliedAt shortlistedAt rejectedAt");

        if (!applicant) {
            return res.status(404).json({
                success: false,
                message: "Applicant not found",
            });
        }

        /* =================================================
           📧 SEND STATUS UPDATE EMAIL (Snapshot-based)
           - Non-blocking
           - Safe even if email fails
        ================================================= */
        try {
            const snapshot = applicant.snapshot;

            if (!snapshot?.email) {
                console.warn("⚠️ Email not sent: snapshot email missing");
            } else {
                await sendMail({
                    to: snapshot.email,
                    subject: `Application Status Update – ${applicant.jobId.title}`,
                    html: applicationStatusTemplate({
                        name: snapshot.name,
                        jobTitle: applicant.jobId.title,
                        status,
                    }),
                });

                console.log(`📧 Status email sent to ${snapshot.email}`);
            }
        } catch (emailError) {
            // Email failure must NOT break admin action
            console.error("❌ Status email failed:", emailError.message);
        }

        /* ===============================
           Response
        =============================== */
        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: applicant,
        });

    } catch (error) {
        console.error("Status update error:", error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});







module.exports = router;