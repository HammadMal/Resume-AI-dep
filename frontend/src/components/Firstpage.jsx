import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';
import LoadingBar from "react-top-loading-bar";
import { FaGoogle, FaApple, FaAmazon, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { SiMeta } from "react-icons/si";
import Footer from "./footer";

import transparent from "../assets/aa.png";



// import Pricing from "./Pricing";

import TestimonialCardSection from "./testemonialcard";
import MarqueeDemo from "./reviews";

import Pricing from "./pricing";

const Firstpage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    // console.log("Opacity debug:", opacity);

    
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Remove transition after animation completes
    const timer = setTimeout(() => {
      const mainElement = document.querySelector('main');
      if (mainElement) {
        mainElement.style.transition = 'none';
      }
    }, 1000);
    
    // Cleanup function
    return () => {
      document.documentElement.style.scrollBehavior = "";
      clearTimeout(timer);
    };
  }, []);

  const handleGetStarted = () => {
    if (ref.current) {
      ref.current.continuousStart(); // Start loading animation
      let progress = 0;
      const interval = setInterval(() => 
      {
        progress += 20;
        if (progress >= 90) 
        {
          clearInterval(interval);
          ref.current.complete(); // Complete animation
          setTimeout(() => navigate("/login"), 200);
        } 
        else 
        {
          ref.current.static(progress);
        }
      }, 100);
    } 
    
    else {
      console.error("Loading bar ref is null");
    }
  };

  
  const handleSignIn = () => {
    if (ref.current) {
      ref.current.continuousStart(); // Start loading animation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 90) {
          clearInterval(interval);
          ref.current.complete(); // Complete animation
          setTimeout(() => navigate("/login"), 200);
        } else {
          ref.current.static(progress);
        }
      }, 100);
    } else {
      console.error("Loading bar ref is null");
    }
  };


  // const handleupgraderesume = () => {
  //   if (ref.current) {
  //     ref.current.continuousStart(); // Start loading animation
  //     let progress = 0;
  //     const interval = setInterval(() => {
  //       progress += 20;
  //       if (progress >= 90) {
  //         clearInterval(interval);
  //         ref.current.complete(); // Complete animation
  //         setTimeout(() => navigate("/login"), 200);
  //       } else {
  //         ref.current.static(progress);
  //       }
  //     }, 100);
  //   } else {
  //     console.error("Loading bar ref is null");
  //   }
  // };
  


  return (
    <div className="min-h-screen relative overflow-hidden">
              <LoadingBar color="#3F7D58" ref={ref} height={3} />

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
      <header className="relative z-10 py-4 px-6 md:px-12 h-24">

        <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
          <div className="flex items-center space-x-2">
          <div>
              <img src={transparent} alt="Logo" className="w-10 h-10" />
            </div>
            <span className="text-white font-bold text-xl">ResumeAI</span>
          </div>
          <nav className="hidden md:flex space-x-8 mr-12">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
            <a href="#Reviews" className="text-white/80 hover:text-white transition-colors">Reviews</a>

          </nav>
          <button 
            onClick={handleSignIn}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-300"
          >
            Sign In
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">
          
          {/* Hero Content */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white/1 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl relative">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-6">
                #1 Resume Analysis Tool for Job Seekers
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
                Enhance Your Resume  with AI Technology
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
           <TestimonialCardSection />
          </div>
          
          {/* Trusted By Section */}
        <div className="mt-20 text-center bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl relative">
          <p className="text-white/60 mb-8 text-lg">Trusted by professionals from companies like</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
            <div className="flex flex-col items-center text-white/70">
              <FaGoogle className="text-3xl mb-2" />
              <span className="font-medium">Google</span>
            </div>
            <div className="flex flex-col items-center text-white/70">
              <FaMicrosoft className="text-3xl mb-2" />
              <span className="font-medium">Microsoft</span>
            </div>
            <div className="flex flex-col items-center text-white/70">
              <FaAmazon className="text-3xl mb-2" />
              <span className="font-medium">Amazon</span>
            </div>
            <div className="flex flex-col items-center text-white/70">
              <FaApple className="text-3xl mb-2" />
              <span className="font-medium">Apple</span>
            </div>
            <div className="flex flex-col items-center text-white/70">
              <SiMeta className="text-3xl mb-2" />
              <span className="font-medium">Meta</span>
            </div>
          </div>
        </div>






        </div>
        
        {/* Features Section */}
<div id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative">
  {/* Section Header */}
  <div className="text-center mb-12">
    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4">
      Features
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">What makes us different?</h2>
  </div>
  
  {/* Feature Cards */}
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


          {/* How It Works Section */}
          {/* <div id="how-it-works" className="max-w-4xl mx-auto px-6 md:px-12 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">How it works?</h2>
            <h3 className="text-xl md:text-2xl text-white/80 text-center mb-12">What happens behind the scenes?</h3> */}

<div id="how-it-works" className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative mt-20">
  {/* Section Header */}
  <div className="text-center mb-12">
    <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4">
      How it works?
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-white">What is happening behind the scenes?</h2>
  </div>
            
            <div className="space-y-16">
              {/* Upload Resume Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">Upload Your Resume</h3>
                <p className="text-white/70 mb-2">
                  Upload your resume in any of the supported formats (PDF, Word, or Plain Text).
                </p>
                <p className="text-white/70">
                  Drag and drop or select the file directly from your computer.
                </p>
              </div>
              
              {/* Paste Job Description Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">Paste Job Description</h3>
                <p className="text-white/70">
                  Paste the job description you are applying for to compare it with your resume.
                  This allows the system to match relevant keywords and content.
                </p>
              </div>
              
              {/* AI-Powered Analysis Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Analysis</h3>
                <p className="text-white/70">
                  Our system uses Natural Language Processing (NLP) and Machine Learning (ML) models to 
                  analyze the structure, grammar, keyword relevance, and overall quality of your resume.
                </p>
              </div>
              
              {/* Get Instant Feedback Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">Get Instant Feedback!</h3>
                <p className="text-white/70">
                  Receive detailed feedback and a quality score for your resume.
                  Actionable suggestions are provided to improve your resume for better job prospects.
                </p>
              </div>
            </div>
          </div>


        {/* Pricing Section */}

        <Pricing />

        {/* Reviews Section */}

        <MarqueeDemo />

        {/* Footer */}
        
        <Footer />












      </main>
    </div>
  );
};

export default Firstpage;