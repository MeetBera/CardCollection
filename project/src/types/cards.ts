export interface Card {
  id: number;
  name: string;
  imageUrl: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Champion';
  elixirCost: number;
  type: 'Troop' | 'Spell' | 'Building' | 'Champion';
  description: string;
  stats: {
    hitpoints?: string;
    damage?: string;
    damagePerSecond?: string;
    range?: string;
    deployTime?: string;
    specialAbility?: string;
  };
}

export type RarityColor = {
  [key in Card['rarity']]: {
    bg: string;
    text: string;
    border: string;
  };
};