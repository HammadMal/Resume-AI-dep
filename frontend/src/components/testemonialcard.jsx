const TestimonialCardSection = () => {
    return (
      <div className="md:w-5/12">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative">
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
                "HR’s toughest challenge? Rejecting an AI-optimized CV. Good luck!"
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs">
                EM
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
          
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all font-medium shadow-lg">
            Upgrade Your Resume Now
          </button>
        </div>
      </div>
    );
  };
  
  export default TestimonialCardSection;