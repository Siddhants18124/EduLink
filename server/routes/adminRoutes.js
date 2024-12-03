const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');


// Admin Routes
router.delete('/repo/:repoId', authMiddleware, adminController.deleteRepoContent); // Delete repo content
router.delete('/question/:questionId', authMiddleware, adminController.deleteQuestion); // Delete question
router.post('/user/role', authMiddleware, adminController.changeUserRole); // Change user role



module.exports = router;
