import { API_URL } from './config';
export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

export const getDecks = async (): Promise<TDeck[]> => {
  const res = await fetch(`${API_URL}/decks`);
  return res.json();
};
