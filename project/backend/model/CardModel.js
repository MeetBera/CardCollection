const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cardStatsSchema = new Schema({
  hitpoints: { type: String },
  damage: { type: String },
  damagePerSecond: { type: String },
  range: { type: String },
  deployTime: { type: String },
  specialAbility: { type: String },
});

const cardSchema = new Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  rarity: {
    type: String,
    enum: ['Common', 'Rare', 'Epic', 'Legendary', 'Champion'],
    required: true,
  },
  elixirCost: { type: Number, required: true },
  type: {
    type: String,
    enum: ['Troop', 'Spell', 'Building', 'Champion'],
    required: true,
  },
  description: { type: String, required: true },
  stats: { type: cardStatsSchema, required: true },
}, { timestamps: true });

const Card = model('Card', cardSchema);

module.exports = Card;
