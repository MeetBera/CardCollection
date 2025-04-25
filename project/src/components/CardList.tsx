import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import CardModal from './CardModal';
import { Card } from '../types/cards';
import SearchFilter from './SearchFilter';

const CardList: React.FC = () => {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Load cards from backend on initial render
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cards');
        const data = await response.json();
        setAllCards(data);
        setFilteredCards(data);
      } catch (err) {
        console.error('Failed to fetch cards:', err);
      }
    };

    fetchCards();
  }, []);

  const handleCardClick = (card: Card) => setSelectedCard(card);

  const handleCloseModal = () => setSelectedCard(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterCards(term, selectedRarity, selectedType);
  };

  const handleRarityFilter = (rarity: string) => {
    setSelectedRarity(rarity);
    filterCards(searchTerm, rarity, selectedType);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    filterCards(searchTerm, selectedRarity, type);
  };

  const filterCards = (term: string, rarity: string, type: string) => {
    const filtered = allCards.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(term.toLowerCase()) ||
        card.description.toLowerCase().includes(term.toLowerCase());
      const matchesRarity = rarity === '' || card.rarity === rarity;
      const matchesType = type === '' || card.type === type;
      return matchesSearch && matchesRarity && matchesType;
    });

    setFilteredCards(filtered);
  };

  const rarities = Array.from(new Set(allCards.map((card) => card.rarity)));
  const types = Array.from(new Set(allCards.map((card) => card.type)));

  return (
    <div className="container mx-auto px-4 py-6">
      <SearchFilter
        onSearch={handleSearch}
        onRarityFilter={handleRarityFilter}
        onTypeFilter={handleTypeFilter}
        rarities={rarities}
        types={types}
        selectedRarity={selectedRarity}
        selectedType={selectedType}
      />

      {filteredCards.length === 0 ? (
        <div className="text-center font-supercell py-10">
          <p className="text-lg font-supercell text-gray-600">No cards match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-4">
          {filteredCards.map((card) => (
            <CardItem key={card._id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      )}

      {selectedCard && <CardModal card={selectedCard} onClose={handleCloseModal} />}
    </div>
  );
};

export default CardList;
