const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

// get all quizzes
router.get('/api/quiz', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create a new quiz
router.post('/api/quiz', async (req, res) => {
  const { question, options, correctAnswer } = req.body;
  const newQuiz = new Quiz({ question, options, correctAnswer });
  try {
    await newQuiz.save();
    res.status(201).json({ message: 'Quiz added successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
