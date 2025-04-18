const express = require('express');
const { analyzeResumeText, analyzeResume } = require('../controllers/analyzerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/analyze', analyzeResume);

module.exports = router;