// frontend/src/services/analyzerService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/analyzer/';

const analyzeResume = async (resumeText, jobDescription) => {
  try {
    // Add some console logs to debug
    console.log("Sending request with:", { resumeText, jobDescription });
    
    if (!resumeText || !jobDescription) {
      throw new Error("Resume text and job description are required");
    }
    
    const token = localStorage.getItem('userToken');
    
    const response = await axios.post(API_URL + 'analyze', 
      { resumeText, jobDescription },  // Make sure both fields are included
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    throw new Error(message);
  }
};

const analyzerService = {
  analyzeResume,
};

export default analyzerService;