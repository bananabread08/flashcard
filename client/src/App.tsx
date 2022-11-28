import './App.css';
import React, { useState, useEffect } from 'react';

export type TDeck = {
  title: string;
  cards: string[];
  _id: string;
};

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);
  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/decks', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const deck = await res.json();
    setDecks([...decks, deck]);
    setTitle('');
  }

  async function handleDeleteDeck(id: string) {
    await fetch(`http://localhost:5001/decks/${id}`, {
      method: 'DELETE',
    });
    setDecks(decks.filter((deck) => deck._id !== id));
  }

  useEffect(() => {
    async function fetchDecks() {
      const res = await fetch('http://localhost:5001/decks');
      const decks = await res.json();
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
              <p>{deck.title}</p>
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
