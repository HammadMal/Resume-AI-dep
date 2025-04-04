"use client";

import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

// SpotlightBox Component as a wrapper
const SpotlightBox = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(14, 165, 233, 0.15), transparent 80%)`;

  return (
    <div
    className="group relative max-w-7xl w-full rounded-2xl border border-white/10 bg-transparent px-8 py-16 shadow-2xl backdrop-blur-md"
    onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </div>
  );
};

export default SpotlightBox;
