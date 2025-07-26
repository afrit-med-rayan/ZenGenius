const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;

    // Optional: Convert buffer to string if it's a text file
    const fileContent = fileBuffer.toString("utf-8");

    // TODO: Connect this to Gemini API later
    console.log("Received file:", fileName);
    console.log("Content preview:", fileContent.slice(0, 100)); // Preview only

    res.json({
      message: "File received!",
      filename: fileName,
      contentSnippet: fileContent.slice(0, 300),
    });
  } catch (error) {
    console.error("Upload failed", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
});

module.exports = router;
