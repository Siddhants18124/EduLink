const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');


// Admin Routes
router.delete('/repo/:repoId', authMiddleware, adminController.deleteRepoContent); // Delete repo content
router.delete('/question/:questionId', authMiddleware, adminController.deleteQuestion); // Delete question
router.post('/user/role', authMiddleware, adminController.changeUserRole); // Change user role

router.get('/reports', adminController.getReports);// Get Reports (Admin Only)
router.post('/block', adminController.blockUser);// Block a User (Admin Only)
router.post('/unblock', adminController.unblockUser);// Unblock a User (Admin Only)
router.get('/blocked', adminController.getBlockedUsers); // Get Blocked Users (Admin Only)


module.exports = router;
