const express = require('express');
const router = express.Router();
const repoController = require('../controllers/repoController');
const authMiddleware = require('../middleware/authMiddleware');

// Repo Routes
router.post('/repo', authMiddleware, repoController.addResource); // Add resource to repo
router.post('/repo/contributor', authMiddleware, repoController.addContributor); // Add contributor to repo
router.post('/repo/:repoId/vote', authMiddleware, repoController.voteRepo); // Upvote/Downvote a repo
router.get('/repo/:repoId', authMiddleware, repoController.getRepoContentById); // Get resource content by ID
router.get('/repo', authMiddleware, repoController.getAllResources);  // Fetch all resources posted

module.exports = router;
