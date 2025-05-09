import React from 'react';
import { AnimatedBackground } from 'animated-backgrounds';

/**
 * A wrapper component for AnimatedBackground that applies optimizations
 * to prevent flickering on mobile devices while maintaining the original design
 */
const OptimizedBackground = () => {
  return (
    <>
      {/* Animated Background with hardware acceleration optimizations */}
      <div className="absolute inset-0 z-0 will-change-transform" 
           style={{ 
             transform: 'translate3d(0,0,0)', 
             WebkitTransform: 'translate3d(0,0,0)',
             WebkitBackfaceVisibility: 'hidden',
             backfaceVisibility: 'hidden'
           }}>
        <AnimatedBackground 
          animationName="auroraBorealis" 
          blendMode="normal" 
          style={{ opacity: 1 }} 
        />
      </div>

      {/* Separate overlay gradient exactly as in the original design */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1 bg-fixed"
           style={{ 
             transform: 'translate3d(0,0,0)', 
             WebkitTransform: 'translate3d(0,0,0)',
             WebkitBackfaceVisibility: 'hidden',
             backfaceVisibility: 'hidden'
           }}>
      </div>
    </>
  );
};

export default OptimizedBackground;