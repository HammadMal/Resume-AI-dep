import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/SignUp';
import Login from './components/Login';
import Homepage from './components/Homepage';
import ForgotPassword from './components/ForgotPassword';
import LoadingBar from "react-top-loading-bar";
import Firstpage from "./components/Firstpage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleAuthHandler from "./components/GoogleAuthHandler";

import VerifyOTP from "./components/VerifyOTP";

import ResetPassword from "./components/ResetPassword";

import ContactUs from "./components/contactus";

import PricingPage from "./components/pricingpage";


function App() {
  const ref = useRef(null); // Create a reference for the loading bar
  // useGoogleRedirect();
  
  return (
    <AuthProvider>
      <Router>
        <LoadingBar color="#f11946" ref={ref} height={3} /> {/* Add the loading bar */}
        
        <Routes>
          <Route path='/' element={<Firstpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/auth/google" element={<GoogleAuthHandler />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path ="/contactus" element={<ContactUs />} />

          <Route path="/pricingpage" element={<PricingPage />} />


        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;