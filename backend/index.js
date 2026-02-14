const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

/* =======================
   CORS (FIXED)
======================= */
// app.use(
//   cors()
// );
app.use(cors({
  origin: process.env.API,
  credentials: true
}));

app.use(express.json());

/* =======================
   Static uploads
======================= */
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
// app.use("/uploads", express.static("uploads"));


/* =======================
   Routes
======================= */
const authRoutes = require("./routes/auth.routes");
const jobRoutes = require("./routes/jobpost.routes");
const applicantRoutes = require("./routes/applicant.routes");
const candidateRoutes = require("./routes/candidate.routes");

app.use("/api", authRoutes);
app.use("/api", jobRoutes);
app.use("/api", applicantRoutes);
app.use("/api", candidateRoutes);

/* =======================
   Server
======================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`connecting to db...`);
});
