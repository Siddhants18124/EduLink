const express = require('express'); 
const UserRoutes = require('./userRoutes');
const QuestionRoutes = require('./questionRoutes')
const RepoRoutes = require('./repoRoutes');
const AdminRoutes = require('./adminRoutes');


const router = express.Router();

router.use('', UserRoutes);
router.use('/question', QuestionRoutes);
router.use('/repo', RepoRoutes);
router.use('/admin', AdminRoutes);

module.exports = router;
 