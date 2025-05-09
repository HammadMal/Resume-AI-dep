import React, {useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import Spotlightbox from "./Spotlightbox";
import { Typewriter } from 'react-simple-typewriter'; // ✅ CORRECT



const TEXTS = [
  "Enhance Your Resume with AI Technology",
  "Get Your Dream Job with Artificial Intelligence",
  "Optimize Your Resume with AI Insights",];



import TestimonialCardSection from "./Testemonialcard";


const FirstHero = ({ loadingBarRef }) => {

  const navigate = useNavigate();
  const ref = loadingBarRef; // Use the passed ref instead

  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      6000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);


  const handleonClick = () => {
    if (ref.current) {
        ref.current.continuousStart();
        let progress = 0;
        const interval = setInterval(() => {
            if (!ref.current) {
                clearInterval(interval);
                return;
            }
            
            progress += 20;
            if (progress >= 90) {
                clearInterval(interval);
                if (ref.current) {
                    ref.current.complete();
                    setTimeout(() => navigate("/demo"), 200);
                }
            }
        }, 100);
    }
};



    const handleGetStarted = () => {
    if (ref.current) {
        ref.current.continuousStart();
        let progress = 0;
        const interval = setInterval(() => {
            if (!ref.current) {
                clearInterval(interval);
                return;
            }
            
            progress += 20;
            if (progress >= 90) {
                clearInterval(interval);
                if (ref.current) {
                    ref.current.complete();
                    setTimeout(() => navigate("/login"), 200);
                }
            }
        }, 100);
    }
};


  return (
    <>

          <Spotlightbox>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">

            <div className="md:w-1/2 mb-12 md:mb-0">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-6">
                #1 Resume Analysis Tool for Job Seekers
              </span>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              {/* <TextTransition springConfig={presets.wobbly}>{TEXTS[index % TEXTS.length]}</TextTransition> */}

                  <Typewriter
                  words={['Enhance your CV', 'Optimize with AI', 'Start for free!']}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                /> 
              
              </h1>
              
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                Our intelligent platform analyzes and optimizes your resume to increase your chances of landing interviews and securing your dream job.

                {/* <Typewriter
    words={['Enhance Your Resume', 'Get Your Dream Job', 'Optimize with AI']}
    loop={true}
    cursor
    cursorStyle="|"
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={1500}
  /> */}
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <button
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  Get Started Free
                </button>
                <button onClick={handleonClick} className="bg-white/10 backdrop-blur-md text-white py-3 px-8 rounded-xl text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                  Watch Demo
                </button>
              </div>              
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">

                  <img src = "https://cdn.builder.io/api/v1/image/assets/TEMP/1aa484b096efd982c17829a912d74329ab81001c4ad1da0197618eb5ae4719c7?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&" className="w-full h-full object-cover rounded-full" ></img>
                  
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                  <img src = "https://cdn.builder.io/api/v1/image/assets/TEMP/a526d51b880f5455948aec3ff5cb0fca1f4b09c016232f7e8057df97104641dd?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&" className="w-full h-full object-cover rounded-full" ></img>


                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">


                  <img src = "https://cdn.builder.io/api/v1/image/assets/TEMP/0ba683f74943142ccaf0fc039abf04fa47637ba466b6819719847d5b3f76f6c6?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&" className="w-full h-full object-cover rounded-full" ></img>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">



                  <img src = "https://cdn.builder.io/api/v1/image/assets/TEMP/191cd4946c126fb603bd2d235c4bc8a50a15ec56b5b874a6d432d90205f4f936?apiKey=5b7d47d822c447fbbf3f0faf7f51790e&" className="w-full h-full object-cover rounded-full" ></img>
                  </div>
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
          
  </>
    
  );
}


export default FirstHero;