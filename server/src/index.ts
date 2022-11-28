import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// MongoDB
const mongoDB = process.env.MONGO_URI;
const db = mongoose.connect(mongoDB);

app.get('/', (req: Request, res: Response) => {
  res.send('HOME');
});

app.get('/hello', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(5001);
