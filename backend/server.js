import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import userRoutes from './routes/user.js'; 
import privateRoute from "./routes/privateRoute.js";
import uploadRoute from './routes/upload.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api', privateRoute);
app.use("/api/upload", uploadRoute);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
