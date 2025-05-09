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

import OptimizedBackground from "./OptimizedBackground";

  
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
    <div className="min-h-screen relative overflow-hidden">
              <LoadingBar color="#3F7D58" ref={ref} height={3} />

              <OptimizedBackground />


    


      {/* Header/Navigation */}
      <Navbar />



      {/* Hero Section */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-100'}`}>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-20">          
          <FirstHero />
        <TrustedBy/>
        </div>

        <Features />
        
        


          {/* How It Works Section */}
          {/* <div id="how-it-works" className="max-w-4xl mx-auto px-6 md:px-12 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">How it works?</h2>
            <h3 className="text-xl md:text-2xl text-white/80 text-center mb-12">What happens behind the scenes?</h3> */}

          <Howitworks />


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