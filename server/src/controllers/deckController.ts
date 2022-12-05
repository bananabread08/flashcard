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

export async function createCardForDeck(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  const { text } = req.body;
  if (!deck) return res.status(400).send('No deck of this id exists');
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
}

export async function getCurrentDeck(req: Request, res: Response) {
  const { deckId } = req.params;
  const deck = await Deck.findById(deckId);
  res.json(deck);
}

export async function deleteCard(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send('No deck of this id exists');
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
}
