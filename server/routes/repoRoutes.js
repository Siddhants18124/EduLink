const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');
const authMiddleware = require('../middleware/authMiddleware');

// Repo Routes
router.post('/repo', authMiddleware, repoController.addResource); // Add content to repo
router.post('/repo/contributor', authMiddleware, repoController.addContributor); // Add contributor
router.post('/repo/:repoId/vote', authMiddleware, repoController.voteRepo); // Upvote/Downvote a repo
router.get('/repo/:repoId', authMiddleware, repoController.getRepoContentById); // Get repo content by ID



module.exports = router;
