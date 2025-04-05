import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';
import { useAuth } from "../context/AuthContext";

import transparent from "../assets/aa.png";

const Homepage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
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

            {/* Overlay gradient for better text contrast */}
            <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1 bg-fixed"></div>
            
            {/* Header/Navigation */}
            <header className="relative z-10 py-4 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
                    <div className="flex items-center space-x-2">
                        <div className=" flex items-center justify-center"> 
                        <div>
                            <img src={transparent} alt="Logo" className="w-10 h-10" />
                        </div>
                        </div>
                        <span className="text-white font-bold text-xl">ResumeAI</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-white font-medium">
                            Welcome, {user.name}
                        </div>
                        <button 
                            onClick={handleLogout}
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
                                <button className="w-full bg-blue-600/80 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                                    Upload Resume
                                </button>
                                <button className="w-full bg-purple-600/80 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                                    Create New Resume
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Your Resume Analysis</h2>
                        <p className="text-white/80 mb-6">
                            You haven't uploaded any resumes yet. Get started by uploading your resume to receive AI-powered analysis and suggestions.
                        </p>
                        
                        <div className="flex justify-center">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-xl shadow-lg transition-all">
                                Upload Your First Resume
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Homepage;