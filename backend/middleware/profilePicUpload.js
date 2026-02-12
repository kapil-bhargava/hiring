const multer = require("multer");
const path = require("path");
const fs = require("fs");

/* ===============================
   Ensure upload directory exists
================================ */
const uploadPath = path.join(__dirname, "..", "uploads", "profile-pics");
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
   File filter (image only)
================================ */
const fileFilter = (req, file, cb) => {
    const allowedExt = [".jpg", ".jpeg", ".png"];
    const allowedMime = ["image/jpeg", "image/png"];

    const ext = path.extname(file.originalname).toLowerCase();

    if (!allowedExt.includes(ext)) {
        return cb(new Error("Only JPG, JPEG, PNG images are allowed"));
    }

    if (!allowedMime.includes(file.mimetype)) {
        return cb(new Error("Invalid image MIME type"));
    }

    cb(null, true);
};

/* ===============================
   Multer instance
================================ */
const profilePicUpload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1 * 1024 * 1024, // 1MB
    },
});

module.exports = profilePicUpload;
