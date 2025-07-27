// upload.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import pdfParse from "pdf-parse";
import { summarizeText } from "../server/utils/summarizeWithGemini.js";

const router = express.Router();

// === Multer Config ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const unique = `${timestamp}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `file-${unique}${ext}`);
  },
});
const upload = multer({ storage });

// === POST /upload ===
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const summary = await summarizeText(pdfData.text);

    rres.json({
       message: "File uploaded and summarized successfully!",
        fileUrl,
        summary,   
   });
  } catch (error) {
    console.error("Upload/summarize error:", error.message);
    res.status(500).json({ error: "Something went wrong during processing." });
  }
});

export default router;
