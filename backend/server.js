import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/to.do.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middleware/error.middleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// Routes
app.use('/api', todoRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening at ${PORT}...`));