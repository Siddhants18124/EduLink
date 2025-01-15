const router = require('express').Router();
const { signup , login, verifyToken, getUser, refreshToken, logout, updateSubjects,reportUser,removeSubjects } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', verifyToken , getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);
router.post('/logout', verifyToken, logout);
router.put('/update-subjects', verifyToken, updateSubjects);
router.put('/remove-subjects', verifyToken, removeSubjects);
router.post('/report', verifyToken, reportUser);// Report a User

module.exports = router;