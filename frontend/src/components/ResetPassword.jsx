import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { AnimatedBackground } from 'animated-backgrounds';

import transparent from "../assets/aa.png";


const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { email, otp } = location.state || {};

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setSuccess("");
    ref.current.continuousStart();

    try {
      const res = await axios.post("http://localhost:5000/api/users/reset-password", {
        email,
        otp,
        newPassword,
      });

      ref.current.complete();
      setSuccess("Password reset successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      ref.current.complete();
      setError(err.response?.data?.message || "Password reset failed");
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

    {/* Header/Navigation */}
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
        <h2 className="text-white text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-white/70 text-center mb-6">Enter a new password</p>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
          className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 shadow-lg"
        >
          Reset Password
        </button>

        {success && <p className="text-green-400 text-center mt-4">{success}</p>}
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
      </div>
    </div>
    </div>
    </div>
  );
};

export default ResetPassword;
