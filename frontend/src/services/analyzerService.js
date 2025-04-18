import axios from 'axios';

const API_URL = 'http://localhost:5000/api/analyzer/';

const analyzeResume = async (formData) => {
    try {
        // Convert file to base64
        const file = formData.get('resume');
        const jobDescription = formData.get('jobDescription');

        if (!file || !jobDescription) {
            throw new Error('Resume file and job description are required');
        }

        const reader = new FileReader();
        const fileContentPromise = new Promise((resolve, reject) => {
            reader.onload = () => {
                // Get base64 content without data URL prefix
                const base64Content = reader.result.split(',')[1];
                resolve(base64Content);
            };
            reader.onerror = reject;
        });

        reader.readAsDataURL(file);
        const base64Content = await fileContentPromise;

        const requestData = new FormData();
        requestData.append('file_content', base64Content);
        requestData.append('file_type', file.type === 'application/pdf' ? 'pdf' : 'txt');
        requestData.append('jobDescription', jobDescription);

        const response = await axios.post(API_URL + 'analyze', requestData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Server error:', error.response?.data || error.message);
        throw new Error(
            error.response?.data?.message || 
            'Failed to analyze resume. Please try again.'
        );
    }
};

export { analyzeResume };