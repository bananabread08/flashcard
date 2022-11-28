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

app.get('/decks', async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
  const deck = new Deck({
    title: req.body.title,
  });
  const createDeck = await deck.save();
  res.json(createDeck);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
});

// MongoDB
mongoose.connect(process.env.MONGO_URI!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
