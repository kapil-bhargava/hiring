const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ===============================
   Ensure upload directory exists
================================ */
const uploadPath = path.join(__dirname, "..", "uploads", "resumes");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* ===============================
   Storage config
================================ */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9.-]/g, "");

    cb(null, `${Date.now()}-${safeName}`);
  },
});

/* ===============================
   File filter (extension + mime)
================================ */
const fileFilter = (req, file, cb) => {
  const allowedExt = [".pdf", ".doc", ".docx"];
  const allowedMime = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedExt.includes(ext)) {
    return cb(new Error("Invalid file type"));
  }

  if (!allowedMime.includes(file.mimetype)) {
    return cb(new Error("Invalid MIME type"));
  }

  cb(null, true);
};

/* ===============================
   Multer instance
================================ */
const resumeUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

module.exports = resumeUpload;
