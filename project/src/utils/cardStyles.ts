import { RarityColor } from '../types/cards';

export const rarityStyles: RarityColor = {
  Common: {
    bg: 'bg-blue-300',
    text: 'text-blue-800',
    border: 'border border-blue-400',
  },
  Rare: {
    bg: 'bg-orange-300',
    text: 'text-orange-800',
    border: 'border border-orange-300',
  },
  Epic: {
    bg: 'bg-purple-300',
    text: 'text-purple-800',
    border: 'border border-purple-400',
  },
  Legendary: {
    bg: 'bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 to-yellow-500 to-yellow-300 ',
    text: 'text-yellow-900',
    border: 'border-2 border-yellow-400',
  },
  Champion: {
    bg: 'bg-gradient-to-r from-red-500 via-orange-500 via-green-500 via-blue-500 to-violet-500',
    text: 'text-white',
    border: 'border-2 border-red-500',
  },
};
// bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500
export const getRarityStyles = (rarity: string) => {
  return rarityStyles[rarity as keyof RarityColor];
};
