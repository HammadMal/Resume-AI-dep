import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import elon from "../assets/elon.png";

const TestimonialCardSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();


  const handleupgraderesume = () => {
    // if (ref.current) {
    //   ref.current.continuousStart(); // Start loading animation
    //   let progress = 0;
    //   const interval = setInterval(() => {
    //     progress += 20;
    //     if (progress >= 90) {
    //       clearInterval(interval);
    //       ref.current.complete(); // Complete animation
    //       setTimeout(() => navigate("/login"), 200);
    //     } else {
    //       ref.current.static(progress);
    //     }
    //   }, 100);
    // } else {
    //   console.error("Loading bar ref is null");
    // }

    navigate("/login");
  };


    return (
      <>
      {/* Positioned at the top of the viewport */}
        {/* <div className="fixed top-0 left-0 right-0 z-50">
          <LoadingBar color="#f11946" ref={ref} />
        </div> */}

      <div className="md:w-5/12">


        <div className="bg-white/2 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl relative">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
          
          {/* Quote Icon */}
          <div className="bg-white/5 p-4 rounded-xl mb-6">
            <svg
              width="28"
              height="21"
              viewBox="0 0 28 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400 fill-current"
            >
              <path
                d="M24 7.3h-5.1L22.3.4H17l-3.4 6.9v10.3H24V7.3zM10.3 17.6V7.3H5L8.6.4H3.4L0 7.3v10.3h10.3z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          
          {/* Testimonial content */}
          <div className="mb-8">
            <p className="text-white text-xl font-medium leading-relaxed mb-5">
                "AI is going to be an incredible tool to help humans solve important problems. There’s a lot of promise in AI to improve everything from healthcare to education"
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs">
                <img src ={elon} alt="User" className="w-full h-full rounded-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-medium">Elon Musk</h4>
                <p className="text-white/60 text-sm">CEO, Tesla & SpaceX</p>
              </div>
            </div>
          </div>
          
          {/* Visual element - gradient line */}
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
            <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
          </div>
          
          {/* <button onClick={handleupgraderesume} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all font-medium shadow-lg">
            Upgrade Your Resume Now
          </button> */}
        </div>
      </div>

      </>
    );
  };
  
  export default TestimonialCardSection;
