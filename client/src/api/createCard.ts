import { API_URL } from './config';
import { TDeck } from './getDecks';

export const createCard = async (
  deckId: string,
  text: string
): Promise<TDeck> => {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards`, {
    method: 'POST',
    body: JSON.stringify({
      text,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
