import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';
import transparent from "../assets/aa.png";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import API_BASE_URL from '../config/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const ref = useRef(null);

  const handleBackToLogin = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
      navigate("/login");
    }, 800);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 THIS WAS MISSING - prevents form default submission
    
    if (!email.trim()) {
      setError('Please enter your email address');
      toast.error('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    ref.current?.continuousStart();
    setError('');
    setSuccess('');

    console.log("Sending email:", email);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/users/forgot-password`, { 
        email: email.trim() 
      });

      console.log("Response from server:", res);

      ref.current?.complete();
      setSuccess("OTP sent to your email. Please check your inbox.");
      toast.success("OTP sent to your email. Please check your inbox.");

      setTimeout(() => {
        navigate("/verify-otp", { state: { email: email.trim() } });
      }, 1500);

    } catch (err) {
      console.error("Error in API call:", err);

      ref.current?.complete();
      
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
          },
        }}
      />
      
      {/* Loading Bar */}
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
      <header className="relative z-10 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
          <Link to="/" className="flex items-center space-x-2">
            <div>
              <img src={transparent} alt="Logo" className="w-10 h-10" />
            </div>
            <span className="text-white font-bold text-xl">ResumeAI</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Forgot Password</h2>
            <p className="text-white/70 text-center mb-8">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>
            
            {/* 🔥 FIXED: Added proper form with onSubmit handler */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>
              
              {/* Error message */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Success message */}
              {success && (
                <div className="bg-green-500/20 border border-green-500/50 text-white p-3 rounded-lg flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{success}</span>
                </div>
              )}
              
              {/* 🔥 FIXED: Changed to submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </div>
                ) : (
                  'Send Reset Code'
                )}
              </button>
            </form>
            
            <div className="mt-6">
              <button
                onClick={handleBackToLogin}
                disabled={isLoading}
                className="w-full text-center text-sm text-white/70 hover:text-white transition-colors disabled:opacity-50"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="relative z-10 mt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-white/60 text-sm">
              <div>© {new Date().getFullYear()} ResumeAI. All rights reserved.</div>
              <div className="flex space-x-6 mt-4 md:mt-0">
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPassword;