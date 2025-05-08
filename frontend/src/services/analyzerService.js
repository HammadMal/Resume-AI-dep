import axios from 'axios';
import API_BASE_URL from '../config/api';


// const API_URL = `${API_BASE_URL}/api/analyzer/`;

const API_URL = `${API_BASE_URL}/api/analyzer/`;


const analyzeResume = async (formData) => {
    try {
        // Change from token to userToken to match auth service
        const token = localStorage.getItem('userToken');
        
        if (!token) {
            throw new Error('Not authorized. Please login again.');
        }

        // Convert file to base64
        const file = formData.get('resume');
        const jobDescription = formData.get('jobDescription');

        if (!file || !jobDescription) {
            throw new Error('Resume file and job description are required');
        }

        const reader = new FileReader();
        const fileContentPromise = new Promise((resolve, reject) => {
            reader.onload = () => {
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
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error('Server error:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            // Handle unauthorized error
            localStorage.removeItem('userToken'); // Clear invalid token
            window.location.href = '/login'; // Redirect to login
            throw new Error('Session expired. Please login again.');
        }
        throw new Error(
            error.response?.data?.message || 
            'Failed to analyze resume. Please try again.'
        );
    }
};

const downloadReport = async (analysisResults) => {
    try {
        const token = localStorage.getItem('userToken'); // Changed from 'token' to 'userToken'
        
        if (!token) {
            throw new Error('Not authorized. Please login again.');
        }

        const response = await axios({
            url: `${API_URL}generate-report`,
            method: 'POST',
            data: { analysisResults },
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resume-analysis-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);

    } catch (error) {
        if (error.response?.status === 401) {
            // Handle unauthorized error
            localStorage.removeItem('userToken');
            window.location.href = '/login';
            throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to download report. Please try again.');
    }
};

export { analyzeResume, downloadReport };