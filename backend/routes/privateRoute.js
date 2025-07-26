import express from "express";
import { checkJwt } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "You successfully accessed a protected route!",
    user: req.auth, 
  });
});

export default router;
