import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Deck from './models/Deck';

dotenv.config();
const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('HOME');
});

app.post('/decks', async (req: Request, res: Response) => {
  const deck = new Deck({
    title: req.body.title,
  });
  const createDeck = await deck.save();
  res.json(createDeck);
});

// MongoDB
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
