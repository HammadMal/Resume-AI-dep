import React from 'react';

const AnalysisResults = ({ results }) => {
    if (!results) return null;
    const { grammar_analysis, ats_analysis, suggestions, remaining_analyses } = results;

    return (
        <div className="mt-8 space-y-8">
            {/* Analysis Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-xl p-6">
                    <div className="text-white/70 mb-2">Daily Analyses Remaining</div>
                    <div className="text-3xl font-bold text-white">{remaining_analyses} / 5</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md rounded-xl p-6">
                    <div className="text-white/70 mb-2">Grammar Score</div>
                    <div className="text-3xl font-bold text-white">{grammar_analysis?.score || 0}/100</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur-md rounded-xl p-6">
                    <div className="text-white/70 mb-2">ATS Score</div>
                    <div className="text-3xl font-bold text-white">{ats_analysis?.score || 0}/100</div>
                </div>
            </div>

            {/* ATS Analysis */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">ATS Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-sm font-medium text-white/70 mb-3">Matching Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {ats_analysis?.matching_keywords?.map((keyword, index) => (
                                <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white/70 mb-3">Missing Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {ats_analysis?.missing_keywords?.map((keyword, index) => (
                                <span key={index} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grammar Analysis */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Grammar Analysis</h2>
                <div className="space-y-4">
                    {grammar_analysis?.errors?.map((error, index) => (
                        <div key={index} className="flex items-start space-x-3 text-white/80">
                            <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Improvement Suggestions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-medium text-white/70 mb-3">Content Improvements</h3>
                        <ul className="space-y-3">
                            {suggestions?.content_improvements?.map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-white/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-white/70 mb-3">Format Improvements</h3>
                        <ul className="space-y-3">
                            {suggestions?.format_improvements?.map((item, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-white/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-sm font-medium text-white/70 mb-3">Skills to Highlight</h3>
                    <div className="flex flex-wrap gap-2">
                        {suggestions?.skills_to_highlight?.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResults;