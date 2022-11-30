import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Deck from './models/Deck';

dotenv.config();
const app = express();
const PORT = 5001;
import { decksRouter } from './routes/decksRoute';
app.use(cors());
app.use(express.json());

app.use('/', decksRouter);

// MongoDB
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
