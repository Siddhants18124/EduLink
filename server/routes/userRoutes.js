const router = require('express').Router();
const { signup , login, verifyToken, getUser, refreshToken, logout, updateSubjects } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', verifyToken , getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);
router.post('/logout', verifyToken, logout);
router.put('/update-subjects', verifyToken, updateSubjects);

module.exports = router;