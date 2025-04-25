import { Card } from '../types/cards';

export const cards: Card[] = [
  {
    id: 1,
    name: "Knight",
    imageUrl: "https://images.pexels.com/photos/4471398/pexels-photo-4471398.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Common",
    elixirCost: 3,
    type: "Troop",
    description: "A tough melee fighter. The Barbarian's handsome, cultured cousin. Rumor has it that he was knighted based on the sheer awesomeness of his mustache alone.",
    stats: {
      hitpoints: "1,450",
      damage: "167",
      damagePerSecond: "119",
      deployTime: "1 sec"
    }
  },
  {
    id: 2,
    name: "Fireball",
    imageUrl: "https://images.pexels.com/photos/3865908/pexels-photo-3865908.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Rare",
    elixirCost: 4,
    type: "Spell",
    description: "Annnnnd... Fireball. Incinerates a small area, dealing high damage. Reduced damage to Crown Towers.",
    stats: {
      damage: "572",
      range: "2.5",
      deployTime: "Instant"
    }
  },
  {
    id: 3,
    name: "Cannon",
    imageUrl: "https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Common",
    elixirCost: 3,
    type: "Building",
    description: "Defensive building. Shoots cannonballs with deadly effect, but cannot target flying troops.",
    stats: {
      hitpoints: "742",
      damage: "167",
      damagePerSecond: "127",
      range: "5.5"
    }
  },
  {
    id: 4,
    name: "Valkyrie",
    imageUrl: "https://images.pexels.com/photos/6272332/pexels-photo-6272332.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Rare",
    elixirCost: 4,
    type: "Troop",
    description: "Tough melee fighter, deals area damage around her. Swarm or horde, no problem! She can take them all out with a few spins.",
    stats: {
      hitpoints: "1,654",
      damage: "221",
      damagePerSecond: "147",
      deployTime: "1 sec"
    }
  },
  {
    id: 5,
    name: "Skeleton Army",
    imageUrl: "https://images.pexels.com/photos/7978851/pexels-photo-7978851.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Epic",
    elixirCost: 3,
    type: "Troop",
    description: "Summons an army of Skeletons. Meet Larry and his friends Harry, Gerry, Terry, Mary, etc.",
    stats: {
      hitpoints: "67 per Skeleton",
      damage: "67 per Skeleton",
      damagePerSecond: "67 per Skeleton",
      deployTime: "1 sec"
    }
  },
  {
    id: 6,
    name: "Princess",
    imageUrl: "https://images.pexels.com/photos/7214951/pexels-photo-7214951.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Legendary",
    elixirCost: 3,
    type: "Troop",
    description: "This Princess shoots flaming arrows from long range. If you're feeling warm feelings towards her, it's probably because you're on fire.",
    stats: {
      hitpoints: "216",
      damage: "140",
      damagePerSecond: "93",
      range: "9",
      deployTime: "1 sec"
    }
  },
  {
    id: 7,
    name: "Inferno Dragon",
    imageUrl: "https://images.pexels.com/photos/6155035/pexels-photo-6155035.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Legendary",
    elixirCost: 4,
    type: "Troop",
    description: "Shoots a focused beam of fire that increases in damage over time. Wears a helmet because flying can be dangerous.",
    stats: {
      hitpoints: "1,070",
      damage: "30-350",
      damagePerSecond: "Up to 700",
      range: "4",
      deployTime: "1 sec"
    }
  },
  {
    id: 8,
    name: "Monk",
    imageUrl: "https://images.pexels.com/photos/7981086/pexels-photo-7981086.jpeg?auto=compress&cs=tinysrgb&w=800",
    rarity: "Champion",
    elixirCost: 5,
    type: "Champion",
    description: "This mystical monk can deflect enemy projectiles with his staff! While deflecting, he takes reduced damage from spells.",
    stats: {
      hitpoints: "2,200",
      damage: "160",
      damagePerSecond: "114",
      range: "Melee",
      deployTime: "1 sec",
      specialAbility: "Deflect projectiles and reduce spell damage"
    }
  } 
];