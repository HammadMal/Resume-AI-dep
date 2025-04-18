import React from 'react';

const AnalysisResults = ({ results }) => {
  if (!results) return null;

  const { grammar_analysis, ats_analysis, suggestions } = results;

  // Helper function to check if a section has valid data
  const hasData = (section) => {
    return section && Object.keys(section).length > 0 && !section.error;
  };

  // Helper function to render arrays with fallback
  const renderArray = (arr, fallback = "None found") => {
    if (!Array.isArray(arr) || arr.length === 0) return fallback;
    return arr.map((item, index) => (
      <li key={index} className="text-white/80">{item}</li>
    ));
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Grammar Analysis Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Grammar Analysis</h2>
        {hasData(grammar_analysis) ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-4xl font-bold text-blue-400">
                {grammar_analysis.score}/100
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Found Issues:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {renderArray(grammar_analysis.errors)}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Suggestions:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {renderArray(grammar_analysis.suggestions)}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white/60">Unable to perform grammar analysis</p>
        )}
      </div>

      {/* ATS Analysis Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">ATS Compatibility</h2>
        {hasData(ats_analysis) ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-4xl font-bold text-blue-400">
                {ats_analysis.score}/100
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Matching Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                  {ats_analysis.matching_keywords?.map((keyword, index) => (
                    <span key={index} className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  )) || <span className="text-white/60">No matching keywords found</span>}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Missing Keywords:</h3>
                <div className="flex flex-wrap gap-2">
                  {ats_analysis.missing_keywords?.map((keyword, index) => (
                    <span key={index} className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-sm">
                      {keyword}
                    </span>
                  )) || <span className="text-white/60">No missing keywords found</span>}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white/60">Unable to perform ATS analysis</p>
        )}
      </div>

      {/* Suggestions Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Improvement Suggestions</h2>
        {hasData(suggestions) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Content Improvements:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {renderArray(suggestions.content_improvements)}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Format Improvements:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {renderArray(suggestions.format_improvements)}
              </ul>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-white mb-2">Skills to Highlight:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.skills_to_highlight?.map((skill, index) => (
                  <span key={index} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                )) || <span className="text-white/60">No specific skills to highlight</span>}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white/60">Unable to generate improvement suggestions</p>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;