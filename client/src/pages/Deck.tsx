import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TDeck } from '../api/getDecks';
import { createCard } from '../api/createCard';
import { getCurrentDeck } from '../api/getCurrentDeck';
import { deleteCard } from '../api/deleteCard';

export const Deck = () => {
  const [deck, setDeck] = useState<TDeck | undefined | null>(null);
  const [text, setText] = useState('');
  const [cards, setCards] = useState<string[]>([]);
  let { deckId } = useParams();

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText('');
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const deck = await getCurrentDeck(deckId);
      setDeck(deck);
      setCards(deck.cards);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <div className="App">
      <ul className="deck-wrapper">
        {cards.map((card, index) => {
          return (
            <li className="deck" key={card}>
              {card}
              <button onClick={() => handleDeleteCard(index)}>X</button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="card-text">Create Card</label>
        <input
          type="text"
          id="card-text"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Deck;
