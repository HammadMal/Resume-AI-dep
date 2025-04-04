import React from 'react';
import { motion } from 'framer-motion';
import { FaGoogle, FaApple, FaAmazon, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { SiMeta } from "react-icons/si";

const icons = [
  { icon: <FaGoogle />, label: "Google" },
  { icon: <FaMicrosoft />, label: "Microsoft" },
  { icon: <FaAmazon />, label: "Amazon" },
  { icon: <FaApple />, label: "Apple" },
  { icon: <SiMeta />, label: "Meta" },
];

const TrustedBy = () => {
  return (
    <motion.div
      className="mt-20 text-center bg-white/1 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <motion.p
        className="text-white/60 mb-8 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Trusted by professionals from companies like
      </motion.p>

      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-white/70"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <span className="font-medium">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrustedBy;
