import React, { useState } from 'react';

export const ImageFallback = ({
  src,
  alt = 'Raji Snacks product',
  className = '',
  loading = 'lazy',
  fallbackText = 'Raji Snacks'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`bg-[#F8F0DF] border border-bordercream flex flex-col items-center justify-center text-center p-4 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg 
          className="w-12 h-12 text-maroon opacity-40 mb-2" 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4"
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="6 6" />
          <circle cx="50" cy="50" r="28" />
          <circle cx="50" cy="50" r="16" />
          <circle cx="50" cy="50" r="4" fill="currentColor" />
        </svg>
        <span className="text-xs font-semibold tracking-wider uppercase text-maroon/70 font-display">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-cream-light ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F4EBD9] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

export default ImageFallback;
