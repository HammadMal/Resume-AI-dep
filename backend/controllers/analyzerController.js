const { spawn } = require('child_process');
const path = require('path');

const analyzeResume = async (req, res) => {
  try {
      // Get file content and job description from form data
      const { file_content, file_type, jobDescription } = req.body;

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
              res.json(parsedResult);
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