import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardList from './components/CardList';
import AdminPage from './components/AdminPage';
import { cards as initialCards } from './data/cards';
import { Card } from './types/cards'; // Adjust this path if needed
import './index.css';

function App() {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addCard = (newCard: Card) => {
    setCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<CardList cards={cards} />} />
            <Route path="/admin" element={<AdminPage addCard={addCard} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
