const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

// Question Routes
router.post('/questions', authMiddleware, questionController.createQuestion);  // Create a question
router.get('/questions', questionController.getQuestions);           // Get all questions
router.get('/questions/:questionId', questionController.getQuestionById);  // Get a question by ID
router.post('/questions/reply',authMiddleware, questionController.addReply);       // Add a reply to a question
router.post('/questions/reply/sub',authMiddleware, questionController.addSubReply); // Add a sub-reply
router.post('/questions/reply/vote',authMiddleware, questionController.voteReply);  // Upvote or downvote a reply

module.exports = router;
