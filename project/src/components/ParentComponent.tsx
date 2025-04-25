import React, { useState } from 'react';
import { cards as initialCards } from '../data/cards'; // Card data
import AdminPage from './AdminPage';
import CardList from './CardList';
import { Card } from '../types/cards'; // ✅ Correct path to type


const ParentComponent: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addCard = (newCard: Card) => {
    setCards((prevCards) => [...prevCards, newCard]);
    console.log('Card added:', newCard);
  };

  return (
    <div>
      <AdminPage addCard={addCard} /> 
      <CardList cards={cards} />
    </div>
  );
};

export default ParentComponent;
