const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const fs = require("fs");

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    res.json({ imageUrl: `/api/images/${req.file.filename}` });
});


router.get("/:filename", (req, res) => {
    const filePath = path.join(__dirname, "../../uploads/", req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: "Image not found" });
    }

    res.sendFile(filePath);
});

module.exports = router;
