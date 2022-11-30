import express from 'express';
import {
  createDeck,
  deleteDeck,
  getAllDecks,
} from '../controllers/deckController';

const router = express.Router();

router.get('/decks', getAllDecks);

router.post('/decks', createDeck);

router.delete('/decks/:deckId', deleteDeck);

export { router as decksRouter };
