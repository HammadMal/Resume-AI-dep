const express = require('express');
const { analyzeResume } = require('../controllers/analyzerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add protect middleware to ensure user is authenticated
router.post('/analyze', protect, analyzeResume);

module.exports = router;