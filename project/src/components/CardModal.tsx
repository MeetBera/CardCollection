import React, { useEffect, useState } from 'react';
import { Card } from '../types/cards';
import { getRarityStyles } from '../utils/cardStyles';
import { X, ChevronRight, ChevronLeft } from 'lucide-react';

interface CardModalProps {
  card: Card;
  onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
  const rarityStyles = getRarityStyles(card.rarity);
  const [slideIndex, setSlideIndex] = useState(0); // 0: Image, 1: Info

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black bg-opacity-75 animate-fadeIn" />

      <div
        className={`relative w-full max-w-md md:max-w-2xl aspect-square bg-white rounded-lg overflow-hidden shadow-2xl border-4 ${rarityStyles.border} transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white bg-opacity-75 text-gray-800 hover:bg-opacity-100 z-10"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Slide controls */}
        <button
          onClick={() => setSlideIndex((prev) => (prev === 0 ? 1 : 0))}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => setSlideIndex((prev) => (prev === 0 ? 1 : 0))}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight />
        </button>

        {/* Slide wrapper */}
        <div className="w-full h-full flex transition-transform duration-300" style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
          {/* Slide 1: Image */}
          <div className="w-full flex-shrink-0 relative aspect-square md:aspect-auto">
            <img
              src={card.imageUrl}
              alt={card.name}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute bottom-0 inset-x-0 h-16 ${rarityStyles.bg} font-supercell bg-opacity-75 backdrop-blur-sm flex items-center justify-between px-4`}
            >
              <h2 className={`text-xl font-supercell ${rarityStyles.text}`}>{card.name}</h2>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex font-supercell items-center justify-center ${rarityStyles.bg} ${rarityStyles.text} border-2 border-white`}>
                  {card.elixirCost}
                </div>
                <span className={`px-2 py-1 rounded font-supercell text-sm font-semibold ${rarityStyles.text}`}>
                  {card.rarity}
                </span>
              </div>
            </div>
          </div>

          {/* Slide 2: Info */}
          <div className="w-full flex-shrink-0 p-6 flex-col items-center justify-center overflow-y-auto">
            <div className="mb-4">
              <h3 className="text-sm font-supercell text-gray-500 mb-1">Description</h3>
              <p className="text-gray-800 text-base">{card.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-supercell text-gray-500 mb-2">Stats</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {card.stats ? (
                  Object.entries(card.stats).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 font-supercell capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium font-supercell text-gray-900">{value}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 font-supercell">No stats available</div>
                )}
              </div>
            </div>

            <div className="mt-6 text-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-supercell ${rarityStyles.bg} ${rarityStyles.text}`}
              >
                {card.type}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
