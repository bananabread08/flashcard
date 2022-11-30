import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { getDecks } from './api/getDecks';
import { TDeck } from './api/getDecks';
import { createDeck } from './api/createDeck';

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDeck(title);
    setDecks([...decks, deck]);
    setTitle('');
  }

  async function handleDeleteDeck(id: string) {
    await deleteDeck(id);
    setDecks(decks.filter((deck) => deck._id !== id));
  }

  useEffect(() => {
    async function fetchDecks() {
      const decks = await getDecks();
      setDecks(decks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className="deck-wrapper">
        {decks.map((deck) => {
          return (
            <li className="deck" key={deck._id}>
              <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            </li>
          );
        })}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Create Deck</label>
        <input
          type="text"
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
