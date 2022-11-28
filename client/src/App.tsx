import './App.css';
import React, { useState } from 'react';
function App() {
  const [title, setTitle] = useState('');

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:5001/decks', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setTitle('');
  }
  return (
    <div className="App">
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
