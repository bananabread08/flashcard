import express from 'express';
import {
  createCardForDeck,
  createDeck,
  deleteCard,
  deleteDeck,
  getAllDecks,
  getCurrentDeck,
} from '../controllers/deckController';

const router = express.Router();

router.get('/decks', getAllDecks);
router.post('/decks', createDeck);
router.delete('/decks/:deckId', deleteDeck);
router.get('/decks/:deckId', getCurrentDeck);
router.post('/decks/:deckId/cards', createCardForDeck);
router.delete('/decks/:deckId/cards/:index', deleteCard);

export { router as decksRouter };
