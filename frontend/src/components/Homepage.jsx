// Updated Homepage.jsx with Resume Analysis integration
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';
import { useAuth } from "../context/AuthContext";
import ResumeAnalysis from "./ResumeAnalysis";
import analyzerService from "../services/analyzerService"; // You'll need to create this
import transparent from "../assets/aa.png";

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
const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        setResumeFile(file);
        
        // For MVP, let's focus on text files
        if (file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                setResumeText("This is a sample resume. I am a software developer with experience in React, Node.js, and MongoDB. I have worked on several web applications and have a strong understanding of JavaScript.");
                console.log("Resume text loaded:", content.substring(0, 100) + "..."); // Debug log
            };
            reader.readAsText(file);
        } else {
            // For non-text files, show a message for now
            console.log("File type:", file.type);
            alert("For this MVP, please use a text (.txt) file. PDF and DOC support coming soon!");
        }
    }
};

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleAnalyzeResume = async () => {
        // Check if we have necessary data
        if (!resumeText && !resumeFile) {
            setError("Please upload a resume first");
            return;
        }
        
        if (!jobDescription) {
            setError("Please enter a job description");
            return;
        }
        
        setError("");
        setAnalyzing(true);
        
        try {
            // For MVP, only analyze text files directly
            // For PDF/DOC, we would need server-side extraction first
            const results = await analyzerService.analyzeResume(resumeText, jobDescription);
            setAnalysisResults(results);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze resume. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

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

            {/* Main content */}
            <main className="relative z-10 container mx-auto px-6 py-12">
                <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-8 shadow-xl max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white/10 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-white mb-3">Profile Information</h2>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-white/70">Name:</span>
                                    <span className="text-white ml-2">{user.name}</span>
                                </div>
                                <div>
                                    <span className="text-white/70">Email:</span>
                                    <span className="text-white ml-2">{user.email}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 rounded-lg p-6">
                            <h2 className="text-xl font-semibold text-white mb-3">Quick Actions</h2>
                            <div className="space-y-3">
                                <input 
                                    type="file" 
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept=".pdf,.doc,.docx,.txt"
                                    className="hidden"
                                />
                                <button 
                                    onClick={triggerFileInput}
                                    className="w-full bg-blue-600/80 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                                >
                                    Upload Resume
                                </button>
                                <button className="w-full bg-purple-600/80 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                                    Create New Resume
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Resume Analysis</h2>
                        {resumeFile ? (
                            <div>
                                <p className="text-white/80 mb-4">
                                    Resume uploaded: {resumeFile.name}
                                </p>
                                
                                <div className="mb-4">
                                    <label className="block text-white text-sm font-medium mb-2">
                                        Job Description:
                                    </label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-28"
                                        placeholder="Paste the job description here to match against your resume..."
                                    />
                                </div>
                                
                                {error && (
                                    <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4">
                                        {error}
                                    </div>
                                )}
                                
                                <div className="flex justify-center">
                                    <button 
                                        onClick={handleAnalyzeResume}
                                        disabled={analyzing}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg transition-all disabled:opacity-70"
                                    >
                                        {analyzing ? 'Analyzing...' : 'Analyze Resume'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="text-white/80 mb-6">
                                    You haven't uploaded any resumes yet. Get started by uploading your resume to receive AI-powered analysis and suggestions.
                                </p>
                                
                                <div className="flex justify-center">
                                    <button 
                                        onClick={triggerFileInput}
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg transition-all"
                                    >
                                        Upload Your First Resume
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Analysis Results */}
                    {analysisResults && (
                        <ResumeAnalysis results={analysisResults} />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Homepage;