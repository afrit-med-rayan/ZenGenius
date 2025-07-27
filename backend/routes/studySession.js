// Add at the top:
import express from 'express';
import UserSession from '../models/UserSession.js';
const router = express.Router();


router.get('/:userId', async (req, res) => {
  try {
    const sessions = await UserSession.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Failed to fetch sessions:", error);
    res.status(500).json({ error: "Failed to load sessions" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { userId, mood, focus } = req.body;
    const session = new UserSession({ userId, mood, focus });
    await session.save();
    res.status(200).json({ message: "Session saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save session" });
  }
});

export default router;
