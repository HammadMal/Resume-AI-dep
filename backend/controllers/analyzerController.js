const { analyzeResume } = require('../utils/resumeAnalyzer');

const analyzeResumeText = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ message: 'Resume text and job description are required' });
    }
    
    const analysisResults = await analyzeResume(resumeText, jobDescription);
    res.json(analysisResults);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: 'Error analyzing resume' });
  }
};

module.exports = {
  analyzeResumeText
};