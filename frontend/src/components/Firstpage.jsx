import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';

const Firstpage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Cleanup function to remove the style when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground 
          animationName="auroraBorealis" 
          blendMode="normal" 
          style={{ opacity: 0.9 }} 
        />
      </div>

      {/* Overlay gradient for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1"></div>

      {/* Header/Navigation */}
      <header className="relative z-10 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-white font-bold text-xl">ResumeAI</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
          </nav>
          <button 
            onClick={handleGetStarted}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">
          
          {/* Hero Content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-6">
                #1 Resume Analysis Tool for Job Seekers
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Enhance Your <span style={{WebkitBackgroundClip: 'text', backgroundClip: 'text'}} className="inline-block text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Resume</span> with AI Technology
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Our intelligent platform analyzes and optimizes your resume to increase your chances of landing interviews and securing your dream job.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  Get Started Free
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white py-3 px-8 rounded-xl text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                  Watch Demo
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">TK</div>
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">MJ</div>
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">BP</div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">SR</div>
                </div>
                <div className="text-white">
                  <span className="font-bold">10,000+</span> satisfied users
                </div>
              </div>
            </div>
            
            {/* Hero Image/Card */}
            <div className="md:w-5/12">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
                
                {/* Mock Resume Analysis UI */}
                <div className="bg-white/5 p-4 rounded-xl mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-white font-semibold">Resume Score</h3>
                    <span className="text-green-400 font-bold">82%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-400 to-green-400 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-400/20 flex items-center justify-center text-green-300 text-xs mt-0.5">✓</div>
                    <div>
                      <h4 className="text-white font-medium">Professional Summary</h4>
                      <p className="text-white/70 text-sm">Strong summary that highlights your value proposition</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-300 text-xs mt-0.5">!</div>
                    <div>
                      <h4 className="text-white font-medium">Skills Section</h4>
                      <p className="text-white/70 text-sm">Add more relevant keywords for your target position</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-red-400/20 flex items-center justify-center text-red-300 text-xs mt-0.5">×</div>
                    <div>
                      <h4 className="text-white font-medium">ATS Compatibility</h4>
                      <p className="text-white/70 text-sm">Complex formatting may cause issues with ATS</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition-all">
                  View Detailed Analysis
                </button>
              </div>
            </div>
          </div>
          
          {/* Trusted By Section */}
          <div className="mt-20 text-center">
            <p className="text-white/60 mb-6">Trusted by professionals from companies like</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="text-white/70 font-bold text-xl">Google</div>
              <div className="text-white/70 font-bold text-xl">Microsoft</div>
              <div className="text-white/70 font-bold text-xl">Amazon</div>
              <div className="text-white/70 font-bold text-xl">Apple</div>
              <div className="text-white/70 font-bold text-xl">Meta</div>
            </div>
          </div>
        </div>
        
        {/* Features Highlights */}
        <div id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-blue-400 text-2xl">📝</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-white/70">Our advanced algorithms evaluate your resume against industry standards and job requirements.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-purple-400 text-2xl">🎯</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Job-Specific Feedback</h3>
              <p className="text-white/70">Get personalized recommendations to optimize your resume for specific positions and industries.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-400 text-2xl">📊</span>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">ATS Optimization</h3>
              <p className="text-white/70">Ensure your resume passes through Applicant Tracking Systems with our compatibility checker.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Firstpage;