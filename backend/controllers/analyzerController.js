const { spawn } = require('child_process');
const path = require('path');
const AnalysisUsage = require('../models/AnalysisUsage');

const DAILY_LIMIT = 5;

const checkDailyLimit = async (userId) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let usage = await AnalysisUsage.findOne({
    userId,
    date: {
      $gte: today
    }
  });

  if (!usage) {
    usage = new AnalysisUsage({ userId, count: 1 });
    await usage.save();
    return { allowed: true, remaining: DAILY_LIMIT - 1 };
  }

  if (usage.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  usage.count += 1;
  await usage.save();
  return { allowed: true, remaining: DAILY_LIMIT - usage.count };
};

const analyzeResume = async (req, res) => {
  try {
    // Add CORS headers specifically for this endpoint
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    
    const userId = req.user._id; // Assuming you have user data in request
    const { allowed, remaining } = await checkDailyLimit(userId);

    if (!allowed) {
      return res.status(429).json({
        message: 'Daily analysis limit reached',
        error: 'You have reached your limit of 5 analyses per day. Please try again tomorrow.'
      });
    }

    // Get file content and job description from request body
    // Support both JSON and FormData formats
    let file_content, file_type, jobDescription;
    
    if (req.is('multipart/form-data') && req.files && req.files.resume) {
      // FormData format
      const file = req.files.resume;
      file_content = file.data.toString('base64');
      file_type = file.mimetype.includes('pdf') ? 'pdf' : 'txt';
      jobDescription = req.body.jobDescription;
    } else {
      // JSON format (sent from modified frontend)
      file_content = req.body.file_content;
      file_type = req.body.file_type;
      jobDescription = req.body.jobDescription;
    }

    if (!file_content) {
      return res.status(400).json({ message: 'File content is required' });
    }

    if (!jobDescription) {
      return res.status(400).json({ message: 'Job description is required' });
    }

    // Create Python process
    const pythonProcess = spawn('python', [
      path.join(__dirname, '../python/analyze.py')
    ]);

    let result = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
      console.error('Python Error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ 
          message: 'Analysis failed',
          error: errorOutput
        });
      }

      try {
        const parsedResult = JSON.parse(result);
        res.json({
          ...parsedResult,
          remaining_analyses: remaining
        });
      } catch (error) {
        res.status(500).json({ 
          message: 'Error parsing analysis results',
          error: error.message 
        });
      }
    });

    // Send data to Python script
    const input = JSON.stringify({
      file_content: file_content,
      file_type: file_type,
      job_description: jobDescription
    });

    pythonProcess.stdin.write(input);
    pythonProcess.stdin.end();

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      message: 'Server error during analysis',
      error: error.message 
    });
  }
};

module.exports = { analyzeResume };