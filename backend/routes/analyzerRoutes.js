const express = require('express');
const { analyzeResume } = require('../controllers/analyzerController');
const { generateReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add protect middleware to ensure user is authenticated
router.post('/analyze', protect, analyzeResume);
router.post('/generate-report', protect, generateReport);

module.exports = router;