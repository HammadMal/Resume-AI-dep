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
      <div className="absolute inset-0 z-0 animated-background-wrapper">
        <div className="animated-background-container">
          <AnimatedBackground 
            animationName="auroraBorealis" 
            blendMode="normal" 
            style={{ 
              opacity: 1,
              transform: 'translate3d(0,0,0)', 
              WebkitTransform: 'translate3d(0,0,0)',
              WebkitBackfaceVisibility: 'hidden',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              WebkitPerspective: '1000px',
              willChange: 'transform',
              touchAction: 'none'
            }} 
          />
        </div>
      </div>

      {/* Overlay gradient with improved mobile performance */}
      <div 
        className="fixed inset-0 bg-gradient-to-b from-black/50 to-blue-900/50 z-1 overlay-gradient"
        style={{
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none'
        }}
      />
    </>
  );
};

export default OptimizedBackground;