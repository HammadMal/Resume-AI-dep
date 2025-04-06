// frontend/src/components/ResumeAnalysis.jsx
import React from 'react';

const ResumeAnalysis = ({ results }) => {
  if (!results) return null;
  
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">ATS Score</h3>
        <div className="relative h-8 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-medium"
            style={{ width: `${results.ats_score}%` }}
          >
            {results.ats_score}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Matched Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {results.matched_keywords.map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
                {keyword}
              </span>
            ))}
            {results.matched_keywords.length === 0 && (
              <p className="text-white/60">No keywords matched.</p>
            )}
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Missing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {results.missing_keywords.slice(0, 15).map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm">
                {keyword}
              </span>
            ))}
            {results.missing_keywords.length > 15 && (
              <span className="text-white/60 text-sm">+{results.missing_keywords.length - 15} more</span>
            )}
            {results.missing_keywords.length === 0 && (
              <p className="text-white/60">No missing keywords!</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white/10 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Improvement Suggestions</h3>
        <ul className="space-y-2">
          {results.grammar_issues.map((issue, idx) => (
            <li key={`g-${idx}`} className="text-white/80 flex items-start">
              <span className="bg-yellow-500/20 text-yellow-300 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">!</span>
              <span>{issue}</span>
            </li>
          ))}
          {results.formatting_issues.map((issue, idx) => (
            <li key={`f-${idx}`} className="text-white/80 flex items-start">
              <span className="bg-red-500/20 text-red-300 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">×</span>
              <span>{issue}</span>
            </li>
          ))}
          {results.improvement_suggestions.map((suggestion, idx) => (
            <li key={`s-${idx}`} className="text-white/80 flex items-start">
              <span className="bg-blue-500/20 text-blue-300 h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">+</span>
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeAnalysis;