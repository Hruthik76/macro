const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const DiaryEntry = require('../models/DiaryEntry');
const Food = require('../models/Food');
const WaterLog = require('../models/WaterLog');
const WeightLog = require('../models/WeightLog');
const mongoose = require('mongoose');

// POST /api/diary (log a meal)
router.post('/', auth, async (req, res) => {
  try {
    const { food, quantity, meal_type, log_date } = req.body;
    const entry = new DiaryEntry({
      user: req.user.id,
      food,
      quantity,
      meal_type,
      log_date: new Date(log_date)
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});
