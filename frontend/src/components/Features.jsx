import React from 'react';
import { motion } from 'framer-motion';

const featureData = [
  {
    icon: "📝",
    title: "AI-Powered Analysis",
    description: "Our advanced algorithms evaluate your resume against industry standards and job requirements.",
    color: "blue"
  },
  {
    icon: "🎯",
    title: "Job-Specific Feedback",
    description: "Get personalized recommendations to optimize your resume for specific positions and industries.",
    color: "purple"
  },
  {
    icon: "📊",
    title: "ATS Optimization",
    description: "Ensure your resume passes through Applicant Tracking Systems with our compatibility checker.",
    color: "green"
  }
];

const Features = () => {
  return (
    <motion.div
      id="features"
      className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.span
          className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Features
        </motion.span>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          What makes us different?
        </motion.h2>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureData.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <div
              className={`w-12 h-12 bg-${feature.color}-500/20 rounded-xl flex items-center justify-center mb-4`}
            >
              <span className={`text-${feature.color}-400 text-2xl`}>
                {feature.icon}
              </span>
            </div>
            <h3 className="text-white text-xl font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-white/70">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Features;
