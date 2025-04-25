const express = require('express');
const Card = require('../model/CardModel'); // adjust path if needed

const router = express.Router();

// POST /api/cards
router.post('/cards', async (req, res) => {
  try {
    const card = new Card(req.body);
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/cards
router.get('/cards', async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
