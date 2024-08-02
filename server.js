//packages imports
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
//files imports
import connectDB from './config/db.js';
//routes imports
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRutes.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoute.js';
import errorMiddleware from './middelwares/errorMIddleware.js';

//dotenv config
dotenv.config();

// mongodb connection
connectDB();

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobsRoutes);

//validation middelware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `node server running in ${process.env.DEV_MODE} mode on port ${PORT} `
      .bgCyan.white
  );
});
