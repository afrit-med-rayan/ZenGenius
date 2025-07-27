// models/UserSession.js
import mongoose from 'mongoose';

const UserSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String },
  focus: { type: Number },
  summary: { type: String },
  flashcards: { type: String }, 
  fileName: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('UserSession', UserSessionSchema);
