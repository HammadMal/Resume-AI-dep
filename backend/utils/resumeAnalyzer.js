const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const unlink = util.promisify(fs.unlink);

async function analyzeResume(resumeText, jobDescription) {
  try {
    // Create temporary files
    const tempDir = path.join(__dirname, '../temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const resumePath = path.join(tempDir, `resume_${Date.now()}.txt`);
    const jobDescPath = path.join(tempDir, `jobdesc_${Date.now()}.txt`);
    const outputPath = path.join(tempDir, `output_${Date.now()}.json`);
    
    // Write input files
    await writeFile(resumePath, resumeText);
    await writeFile(jobDescPath, jobDescription);
    
    // Execute Python script
    // Execute Python script
    const pythonScript = path.join(__dirname, '../python/analyze.py');
    const command = `py "${pythonScript}" "${resumePath}" "${jobDescPath}" "${outputPath}"`;

    
    return new Promise((resolve, reject) => {
      exec(command, async (error, stdout, stderr) => {
        try {
          if (error) {
            console.error(`Error: ${error.message}`);
            return reject(error);
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
          }
          
          // Read results
          const results = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
          
          // Clean up temp files
          await unlink(resumePath);
          await unlink(jobDescPath);
          await unlink(outputPath);
          
          resolve(results);
        } catch (err) {
          reject(err);
        }
      });
    });
  } catch (err) {
    console.error('Analysis error:', err);
    throw err;
  }
}

module.exports = { analyzeResume };