import react from "react";

import Spotlightbox from "./Spotlightbox";


import TestimonialCardSection from "./testemonialcard";

const FirstHero = () => {

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


  return (
          <Spotlightbox>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

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

          {/* <Spotlightbox /> */}
          </Spotlightbox>
        
    
  );
}


export default FirstHero;