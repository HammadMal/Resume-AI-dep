const express = require('express');
const { analyzeResumeText } = require('../controllers/analyzerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/analyze', protect, analyzeResumeText);

module.exports = router;