// Updated Homepage.jsx with Resume Analysis integration
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';
import { useAuth } from "../context/AuthContext";
// import ResumeAnalysis from "./ResumeAnalysis";
// import analyzerService from "../services/analyzerService"; // You'll need to create this
import transparent from "../assets/aa.png";
import AnalysisResults from './AnalysisResults';


import { analyzeResume } from "../services/analyzerService";


const Homepage = () => {
    const { user, logout } = useAuth();
    const fileInputRef = useRef(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [analysisResults, setAnalysisResults] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    // Modify your handleFileUpload function in Homepage.jsx
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file type
            if (!['application/pdf', 'text/plain'].includes(file.type)) {
                setError("Please upload a PDF or TXT file only");
                return;
            }

            setResumeFile(file);
            
            // For text files, extract content
            if (file.type === 'text/plain') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setResumeText(e.target.result);
                };
                reader.onerror = () => {
                    setError("Failed to read file content");
                };
                reader.readAsText(file);
            } else {
                // For PDF files, we'll let the backend handle extraction
                setResumeText("");
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleAnalyzeResume = async () => {
        if (!resumeFile) {
            setError("Please upload a resume first");
            return;
        }
        
        if (!jobDescription.trim()) {
            setError("Please enter a job description");
            return;
        }
        
        setError("");
        setAnalyzing(true);
        
        try {
            const formData = new FormData();
            formData.append('resume', resumeFile);
            formData.append('jobDescription', jobDescription);
    
            const results = await analyzeResume(formData);
            setAnalysisResults(results);
        } catch (err) {
            console.error('Analysis error:', err);
            if (err.response?.status === 429) {
                setError("You have reached your daily limit of 5 analyses. Please try again tomorrow.");
            } else {
                setError(err.message || "Failed to analyze resume. Please try again.");
            }
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen relative">
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <AnimatedBackground 
                    animationName="auroraBorealis" 
                    blendMode="normal" 
                    style={{ opacity: 1 }} 
                />
            </div>

            <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1 bg-fixed"></div>
            
            {/* Header/Navigation */}
            <header className="relative z-10 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center"> 
                            <img src={transparent} alt="Logo" className="w-10 h-10 rounded-full" />
                        </div>
                        <span className="text-white font-bold text-xl">ResumeAI</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-white font-medium">
                            Welcome, {user.name}
                        </div>
                        <button 
                            onClick={() => logout()}
                            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-6 py-12">
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold text-white">Resume Analysis</h1>
                        <div className="flex items-center space-x-4 bg-white/10 rounded-lg p-3">
                            <div className="text-white/70">
                                <span className="font-medium text-white">{user.name}</span>
                                <div className="text-sm">{user.email}</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 rounded-lg p-8">
                        {resumeFile ? (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-1 bg-white/10 rounded-lg p-4">
                                        <div className="text-white/70 text-sm mb-1">Current Resume</div>
                                        <div className="text-white font-medium">{resumeFile.name}</div>
                                    </div>
                                    <button 
                                        onClick={triggerFileInput}
                                        className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-4 py-2 rounded-lg transition-all"
                                    >
                                        Change File
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Job Description
                                    </label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                                        placeholder="Paste the job description here to match against your resume..."
                                    />
                                </div>

                                {error && (
                                    <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg">
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-center pt-4">
                                    <button 
                                        onClick={handleAnalyzeResume}
                                        disabled={analyzing}
                                        className="relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-70 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                    >
                                        {analyzing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Analyzing Resume...
                                            </>
                                        ) : (
                                            'Analyze Resume'
                                        )}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".pdf,.txt"
                                    className="hidden"
                                />
                                <div className="mb-6">
                                    <div className="text-white text-xl font-medium mb-2">
                                        Upload Your Resume
                                    </div>
                                    <p className="text-white/60">
                                        Upload your resume to get AI-powered analysis and improvement suggestions
                                    </p>
                                </div>
                                <button 
                                    onClick={triggerFileInput}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Upload Resume
                                </button>
                            </div>
                        )}
                    </div>

                    {analysisResults && <AnalysisResults results={analysisResults} />}
                </div>
            </main>
        </div>
    );
};

export default Homepage;