// Enhanced Homepage.jsx with improved UI
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';
import { useAuth } from "../context/AuthContext";
import transparent from "../assets/aa.png";
import AnalysisResults from './AnalysisResults';

import { analyzeResume, downloadReport } from '../services/analyzerService';
import { toast } from 'react-hot-toast';

const Homepage = () => {
    const { user, logout } = useAuth();
    const fileInputRef = useRef(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeText, setResumeText] = useState("");
    const [jobDescription, setJobDescription] = useState(() => {
        // Initialize from localStorage
        return localStorage.getItem('jobDescription') || "";
    });
    const [analysisResults, setAnalysisResults] = useState(() => {
        // Initialize from localStorage
        const savedResults = localStorage.getItem('analysisResults');
        return savedResults ? JSON.parse(savedResults) : null;
    });
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState("");
    const [downloading, setDownloading] = useState(false);

    // Save results to localStorage whenever they change
    useEffect(() => {
        if (analysisResults) {
            localStorage.setItem('analysisResults', JSON.stringify(analysisResults));
        }
    }, [analysisResults]);

    // Save job description to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('jobDescription', jobDescription);
    }, [jobDescription]);

    // Clear localStorage when user logs out
    const handleLogout = () => {
        localStorage.removeItem('analysisResults');
        localStorage.removeItem('jobDescription');
        logout();
    };

    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

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
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
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

    const handleDownloadReport = async () => {
        if (!analysisResults) return;
        
        try {
            setDownloading(true);
            await downloadReport(analysisResults);
            toast.success('Report downloaded successfully!');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-screen relative bg-gray-900">
            {/* Enhanced Animated Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <AnimatedBackground 
                    animationName="auroraBorealis" 
                    blendMode="normal" 
                    style={{ opacity: 1 }} 
                />
            </div>

            {/* Gradient overlay */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1 bg-fixed"></div>
             
            {/* Glass pattern overlay */}
            <div className="fixed inset-0 bg-gradient-radial from-white/5 to-transparent bg-[length:20px_20px] opacity-10 z-1"></div>
            
            {/* Header/Navigation */}
            <header className="relative z-10 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center"> 
                            <img src={transparent} alt="Logo" className="w-10 h-10" />
                        </div>
                        <span className="text-white font-bold text-xl">ResumeAI</span>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                        <div className="text-white font-medium hidden md:block">
                            <span className="text-white/70 mr-2">Welcome,</span>
                            <span className="text-white">{user?.name}</span>
                        </div>
                        <button 
                            onClick={handleLogout}
                            className="bg-white/10 hover:bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-lg border border-white/10 transition-all duration-300 shadow-sm hover:shadow-white/5 flex items-center space-x-2 group"
                        >
                            <span>Logout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 container mx-auto px-4 py-12 pb-24">
                <div className="max-w-5xl mx-auto">
                    {/* Main card with glass effect */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden mb-8">
                        {/* Card header */}
                        <div className="bg-gradient-to-r from-blue-800/80 to-purple-800/80 px-8 py-6 border-b border-white/10">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">Resume Analysis</h1>
                                    <p className="text-blue-200">Get AI-powered feedback to match your resume with job descriptions</p>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
                                        <div className="text-white/70">
                                            <span className="font-medium text-white">{user?.name}</span>
                                            <div className="text-sm">{user?.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Card body */}
                        <div className="p-8">
                            {resumeFile ? (
                                <div className="space-y-8">
                                    {/* Resume file info */}
                                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                        <div className="flex-1 bg-white/5 rounded-lg p-5 border border-white/10 mb-4 md:mb-0">
                                            <div className="flex items-center">
                                                <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-white/70 text-sm mb-1">Current Resume</div>
                                                    <div className="text-white font-medium">{resumeFile.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={triggerFileInput}
                                            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-5 py-3 rounded-lg transition-all flex items-center justify-center space-x-2 border border-blue-500/30"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <span>Change File</span>
                                        </button>
                                    </div>

                                    <input 
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".pdf,.txt"
                                        className="hidden"
                                    />

                                    {/* Job Description */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-3 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Job Description
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                value={jobDescription}
                                                onChange={(e) => setJobDescription(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent h-40 backdrop-blur-sm"
                                                placeholder="Paste the job description here to match against your resume..."
                                            />
                                            {jobDescription && (
                                                <div className="absolute top-2 right-2 bg-blue-500/10 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                                                    {jobDescription.length} characters
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Error message */}
                                    {error && (
                                        <div className="bg-red-500/10 border border-red-500/30 text-white p-4 rounded-lg flex items-start">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>{error}</span>
                                        </div>
                                    )}

                                    {/* Analyze button */}
                                    <div className="flex justify-center pt-4">
                                        <button 
                                            onClick={handleAnalyzeResume}
                                            disabled={analyzing}
                                            className="relative inline-flex items-center px-8 py-4 overflow-hidden text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-purple-600/20"
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
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                    </svg>
                                                    Analyze Resume
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <input 
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileUpload}
                                        accept=".pdf,.txt"
                                        className="hidden"
                                    />
                                    
                                    {/* File upload illustration */}
                                    <div className="mb-8 flex justify-center">
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-8">
                                        <div className="text-white text-2xl font-medium mb-3">
                                            Upload Your Resume
                                        </div>
                                        <p className="text-white/60 max-w-md mx-auto">
                                            Upload your resume to get AI-powered analysis and improvement suggestions tailored to your target job
                                        </p>
                                    </div>
                                    
                                    <button 
                                        onClick={triggerFileInput}
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg shadow-purple-600/20"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                        Upload Resume
                                    </button>
                                    
                                    {/* Supported formats */}
                                    <div className="mt-6 text-white/50 text-sm flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Supported formats: PDF, TXT
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Analysis Results Section */}
                    {analysisResults && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl overflow-hidden mb-8">
                            <div className="bg-gradient-to-r from-green-800/80 to-emerald-800/80 px-8 py-6 border-b border-white/10">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    Analysis Results
                                </h2>
                            </div>
                            <div className="p-8">
                                <AnalysisResults results={analysisResults} />
                                
                                {/* Download button */}
                                <div className="mt-8 flex justify-end">
                                    <button
                                        onClick={handleDownloadReport}
                                        disabled={downloading}
                                        className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600/70 to-green-600/70 hover:from-emerald-600/90 hover:to-green-600/90
                                                text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-md shadow-green-500/20"
                                    >
                                        {downloading ? (
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        )}
                                        <span>{downloading ? 'Downloading...' : 'Download Report'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Footer */}
                    <div className="text-center text-white/40 text-sm py-6">
                        <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Homepage;