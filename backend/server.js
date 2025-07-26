// server.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js'; 
import privateRoute from "./routes/privateRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use('/api/users', userRoutes);
app.use("/api", privateRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
