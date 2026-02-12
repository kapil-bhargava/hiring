const express = require("express");
const router = express.Router();

const Job = require("../models/job")


// creating job 
router.post("/job", async (req, res) => {
    try {
        const {
            title,
            jobType,
            location,
            experience,
            salary,
            description,
        } = req.body;
        
        const job = new Job({
            title,
            jobType,
            location,
            experience,
            salary,
            description,
        });
        
        await job.save();

        res.json({ msg: "Job created successfully" });
    } catch (error) {
        res.json({ msg: "Server error" });
    }
});

// creating job 
router.get("/job", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Server error",
    });
  }
});


router.get("/job/:id", async (req, res) => {
  try {
    // const job = await Job.findById(req.params.id);
    const job = await Job.findOne({_id:req.params.id});

    if (!job) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});


// Put job
router.put("/job", async (req, res) => {
  try {
    const {
            title,
            jobType,
            location,
            experience,
            salary,
            description,
        } = req.body;
    // const job = await Job.findById(req.params.id);
    const job = await Job.findOneAndUpdate({_id:req.body.id},{
      title,
            jobType,
            location,
            experience,
            salary,
            description,
    });


    res.json({message:"Job updated"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// delete job 
router.delete("/job/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: job
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});


module.exports = router;
