import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function getAllDecks(req: Request, res: Response) {
  const decks = await Deck.find();
  res.json(decks);
}

export async function createDeck(req: Request, res: Response) {
  const deck = new Deck({
    title: req.body.title,
  });
  const createDeck = await deck.save();
  res.json(createDeck);
}

export async function deleteDeck(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
}
