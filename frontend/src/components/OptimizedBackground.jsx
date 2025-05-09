import React from 'react';
import { AnimatedBackground } from 'animated-backgrounds';

/**
 * A wrapper component for AnimatedBackground that applies optimizations
 * to prevent flickering on mobile devices
 */
const OptimizedBackground = () => {
  return (
    <>
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground 
          animationName="auroraBorealis" 
          blendMode="normal" 
          style={{ 
            opacity: 1,
            transform: 'translate3d(0,0,0)', 
            WebkitTransform: 'translate3d(0,0,0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }} 
        />
      </div>

      {/* Overlay gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1"></div>
    </>
  );
};

export default OptimizedBackground;