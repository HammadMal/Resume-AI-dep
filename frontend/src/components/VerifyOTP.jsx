import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from "animated-backgrounds";

import transparent from "../assets/aa.png";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const email = location.state?.email || ""; // Passed from ForgotPassword
  const handleSubmit = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }
  
    setError("");
    setSuccess("");
    ref.current.continuousStart();
  
    // Log the data you're sending
    console.log("Email:", email);
    console.log("OTP:", otp);
  
    try {
      const res = await axios.post("http://localhost:5000/api/users/verify-otp", {
        email,
        otp,
      });
  
      ref.current.complete();
      setSuccess("OTP verified! Redirecting...");
  
      setTimeout(() => {
        navigate("/reset-password", { state: { email, otp } });
      }, 1500);
  
    } catch (err) {
      ref.current.complete();
      setError(err.response?.data?.message || "OTP verification failed");
    }
  };
  

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

            <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1 bg-fixed"></div>
            <header className="relative z-10 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center mt-10">
          <div className="flex items-center space-x-2">
            <div>
                          <img src={transparent} alt="Logo" className="w-10 h-10" />
            </div>
            <span className="text-white font-bold text-xl">ResumeAI</span>
          </div>
        </div>
      </header>



      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
        <div className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
            <h2 className="text-white text-2xl font-bold mb-4 text-center">Verify OTP</h2>
            <p className="text-white/70 text-center mb-6">Enter the 6-digit OTP sent to your email</p>

            <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            placeholder="Enter OTP"
            className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />

            <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg"
            >
            Verify OTP
            </button>

            {success && <p className="text-green-400 text-center mt-4">{success}</p>}
            {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </div>
        </div>
        </div>

    </div>
  );
};

export default VerifyOTP;
