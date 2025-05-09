import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';
import { useAuth } from "../context/AuthContext";
import transparent from "../assets/aa.png";


const Signup = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false
  });
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, agreeToTerms } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginClick = () => {
    ref.current.continuousStart();
    setTimeout(() => {
      ref.current.complete();
      navigate("/login");
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (!agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setIsLoading(true);
    ref.current.continuousStart();
    
    try {
      await register(name, email, password);
      ref.current.complete();
      navigate("/homepage");
    } catch (error) {
      setError(error.message);
      ref.current.complete();
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/users/google';
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
        <div className="w-full max-w-lg">
          <div className="bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-2">Create Account</h2>
            <p className="text-white/70 text-center mb-8">Join thousands of job seekers using ResumeAI</p>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSignup}>
              <div>
                <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="name"
                    value={name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Create a strong password"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input 
                  id="terms" 
                  name="agreeToTerms" 
                  type="checkbox" 
                  checked={agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-white">
                  I agree to the <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Terms of Service</span> and <span className="text-blue-400 hover:text-blue-300 cursor-pointer">Privacy Policy</span>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 font-medium shadow-lg disabled:opacity-70"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
            

            
            <p className="mt-6 text-center text-sm text-white/70">
              Already have an account?{" "}
              <button
                onClick={handleLoginClick}
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Sign in
              </button>
            </p>
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

export default Signup;