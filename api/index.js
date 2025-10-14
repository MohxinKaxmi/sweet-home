import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Connection error:", err);
  });

app.listen(3000, () => {
  console.log('Server is running at port 3000');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);