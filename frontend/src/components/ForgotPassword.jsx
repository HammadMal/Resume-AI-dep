import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const ref = useRef(null);

  const handleBackToLogin = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
      navigate("/login");
    }, 800);
  };

  const handleSubmit = () => {
    ref.current.continuousStart();
    // Simulate email sending process
    setTimeout(() => {
      ref.current.complete();
      // Here you would typically show a success message
      // For now, we'll just navigate back to login
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
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
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg"
              >
                Send Reset Link
              </button>
            </form>
            
            <div className="mt-6">
              <button
                onClick={handleBackToLogin}
                className="w-full text-center text-sm text-white/70 hover:text-white"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;