import React from 'react';
import { AnimatedBackground } from 'animated-backgrounds';

/**
 * A wrapper component for AnimatedBackground that applies optimizations
 * to prevent flickering on mobile devices
 */
const OptimizedBackground = ({ animationName = 'auroraBorealis', blendMode = 'normal', opacity = 1 }) => {
  return (
    <div className="animated-background-wrapper">
      <div className="animated-background-container">
        <AnimatedBackground 
          animationName={animationName} 
          blendMode={blendMode} 
          style={{ 
            opacity, 
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
          }} 
        />
      </div>
      {/* Add the overlay gradient as a separate element for better performance */}
      <div className="overlay-gradient bg-gradient-to-b from-black/50 to-blue-900/50"></div>
    </div>
  );
};

export default OptimizedBackground;