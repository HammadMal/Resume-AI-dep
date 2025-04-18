import React, { useRef,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';
import transparent from "../assets/aa.png";
import axios from 'axios';


const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const ref = useRef(null);

  const handleBackToLogin = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
      navigate("/login");
    }, 800);
  };

  const handleSubmit = async () => {
    ref.current.continuousStart();
    setError('');
    setSuccess('');
  
    console.log("Sending email:", email);  // Log the email you're sending to the backend
  
    try {
      const res = await axios.post("http://localhost:5000/api/users/forgot-password", { email });
  
      console.log("Response from server:", res);  // Log the server response
  
      ref.current.complete();
      setSuccess("OTP sent to your email. Please check your inbox.");
  
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1500);
  
    } catch (err) {
      console.error("Error in API call:", err); // Log the full error here
  
      ref.current.complete();
      setError(err.response?.data?.message || "Something went wrong");
    }
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
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

            {success && <p className="text-green-400 text-center mt-4">{success}</p>}
            {error && <p className="text-red-400 text-center mt-4">{error}</p>}

            
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