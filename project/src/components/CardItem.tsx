import React from 'react';
import { Card } from '../types/cards';
import { getRarityStyles } from '../utils/cardStyles';

interface CardItemProps {
  card: Card;
  onClick: (card: Card) => void;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClick }) => {
  const rarityStyles = getRarityStyles(card.rarity);
  
  return (
    <div
      onClick={() => onClick(card)}
      className={`relative rounded-lg overflow-hidden shadow-md cursor-pointer 
                transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                ${rarityStyles.border}`}
      data-testid={`card-${card.id}`}
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={card.imageUrl}
          alt={card.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute font-supercell top-0 left-0 m-2 px-2 py-1 rounded-md text-xs font-bold flex items-center space-x-2">
          <div className={`w-6 h-6 flex items-center justify-center rounded-full ${rarityStyles.bg} ${rarityStyles.text}`}>
            {card.elixirCost}
          </div>
          
        </div>
      </div>
      <div className={`p-3 ${rarityStyles.bg} ${rarityStyles.text}`}>
        <h3 className="font-supercell  text-center truncate">{card.name}</h3>
        <div className="flex font-supercell justify-between items-center mt-1 text-xs opacity-90">
          <span>{card.type}</span>
        </div>
      </div>
    </div>
  );
};

export default CardItem;