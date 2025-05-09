import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatedBackground } from 'animated-backgrounds';
import LoadingBar from "react-top-loading-bar";
import Footer from "./Footer";
import Navbar from "./Navbar";

import FirstHero from "./FirstHero";
import TrustedBy from "./TrustedBy";

import Features from "./Features";

import Howitworks from "./Howitworks";
import MarqueeDemo from "./Reviews";

import Pricing from "./Pricing";


  
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


  


  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[9999]">
        <LoadingBar color="#3F7D58" ref={ref} height={3} />
      </div>
      <div className="min-h-screen relative overflow-hidden">
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
        <Navbar />

        {/* Hero Section */}
        <main className={`relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-100'}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">          
            <FirstHero loadingBarRef={ref} />
            <TrustedBy/>
          </div>

          <Features />

          <Howitworks />

          <Pricing />

          <MarqueeDemo />

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Firstpage;