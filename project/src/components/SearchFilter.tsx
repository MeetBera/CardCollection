import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onRarityFilter: (rarity: string) => void;
  onTypeFilter: (type: string) => void;
  rarities: string[];
  types: string[];
  selectedRarity: string;
  selectedType: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onRarityFilter,
  onTypeFilter,
  rarities,
  types,
  selectedRarity,
  selectedType
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleRarityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRarityFilter(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeFilter(e.target.value);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center font-supercell">Clash Royale Card Collection</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={20} className="text-gray-400 font-supercell" />
          </div>
          <input
            type="text"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 w-full p-2 rounded-md font-supercell bg-white bg-opacity-20 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-blue-200 text-white"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 md:w-auto">
          <select
            value={selectedRarity}
            onChange={handleRarityChange}
            className="p-2 rounded-md bg-white bg-opacity-40 border font-supercell border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="">All Rarities</option>
            {rarities.map(rarity => (
              <option key={rarity} value={rarity}>{rarity}</option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className="p-2 rounded-md bg-white bg-opacity-40 border font-supercell border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          >
            <option value="">All Types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;