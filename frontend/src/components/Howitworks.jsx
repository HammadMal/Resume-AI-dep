import React from "react";

const Howitworks = () => {

return (

    <div id="how-it-works" className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative mt-20">
            {/* Section Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4">
                How it works?
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">What is happening behind the scenes?</h2>
            </div>
            
            <div className="space-y-16">
              {/* Upload Resume Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">Upload Your Resume</h3>
                <p className="text-white/70 mb-2">
                  Upload your resume in any of the supported formats (PDF, Word, or Plain Text).
                </p>
                <p className="text-white/70">
                  Drag and drop or select the file directly from your computer.
                </p>
              </div>
              
              {/* Paste Job Description Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">Paste Job Description</h3>
                <p className="text-white/70">
                  Paste the job description you are applying for to compare it with your resume.
                  This allows the system to match relevant keywords and content.
                </p>
              </div>
              
              {/* AI-Powered Analysis Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">AI-Powered Analysis</h3>
                <p className="text-white/70">
                  Our system uses Natural Language Processing (NLP) and Machine Learning (ML) models to 
                  analyze the structure, grammar, keyword relevance, and overall quality of your resume.
                </p>
              </div>
              
              {/* Get Instant Feedback Section */}
              <div className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                <h3 className="text-2xl font-semibold text-white mb-4">Get Instant Feedback!</h3>
                <p className="text-white/70">
                  Receive detailed feedback and a quality score for your resume.
                  Actionable suggestions are provided to improve your resume for better job prospects.
                </p>
              </div>
            </div>
          </div>

    


);

}

export default Howitworks;