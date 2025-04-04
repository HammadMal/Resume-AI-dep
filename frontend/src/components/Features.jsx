import react from 'react';

const Features = () => {
return (

    <div id="features" className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative">
    {/* Section Header */}
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4">
        Features
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-white">What makes us different?</h2>
    </div>
    
    {/* Feature Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
          <span className="text-blue-400 text-2xl">📝</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">AI-Powered Analysis</h3>
        <p className="text-white/70">Our advanced algorithms evaluate your resume against industry standards and job requirements.</p>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
          <span className="text-purple-400 text-2xl">🎯</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">Job-Specific Feedback</h3>
        <p className="text-white/70">Get personalized recommendations to optimize your resume for specific positions and industries.</p>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
          <span className="text-green-400 text-2xl">📊</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">ATS Optimization</h3>
        <p className="text-white/70">Ensure your resume passes through Applicant Tracking Systems with our compatibility checker.</p>
      </div>
    </div>
  </div>

);
}


export default Features;