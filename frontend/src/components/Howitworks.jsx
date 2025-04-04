import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Upload Your Resume",
    desc1: "Upload your resume in any of the supported formats (PDF, Word, or Plain Text).",
    desc2: "Drag and drop or select the file directly from your computer.",
  },
  {
    title: "Paste Job Description",
    desc1: "Paste the job description you are applying for to compare it with your resume.",
    desc2: "This allows the system to match relevant keywords and content.",
  },
  {
    title: "AI-Powered Analysis",
    desc1: "Our system uses Natural Language Processing (NLP) and Machine Learning (ML) models to",
    desc2: "analyze the structure, grammar, keyword relevance, and overall quality of your resume.",
  },
  {
    title: "Get Instant Feedback!",
    desc1: "Receive detailed feedback and a quality score for your resume.",
    desc2: "Actionable suggestions are provided to improve your resume for better job prospects.",
  },
];

const Howitworks = () => {
  return (
    <motion.div
      id="how-it-works"
      className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-white/1 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl relative mt-20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm mb-4">
          How it works?
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          What is happening behind the scenes?
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="space-y-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="text-center bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">{step.title}</h3>
            <p className="text-white/70 mb-2">{step.desc1}</p>
            <p className="text-white/70">{step.desc2}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Howitworks;
