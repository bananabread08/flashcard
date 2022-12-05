import { API_URL } from './config';
import { TDeck } from './getDecks';

export async function deleteCard(
  deckId: string,
  index: number
): Promise<TDeck> {
  const res = await fetch(`${API_URL}/decks/${deckId}/cards/${index}`, {
    method: 'DELETE',
  });
  return res.json();
}
