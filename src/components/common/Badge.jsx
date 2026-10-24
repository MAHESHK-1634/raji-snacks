import React from 'react';

export const Badge = ({
  children,
  variant = 'gold',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    gold: 'bg-gold-soft text-maroon-dark border border-gold/40',
    maroon: 'bg-maroon text-warmwhite border border-maroon-dark',
    forest: 'bg-forest-50 text-forest border border-forest/30',
    cream: 'bg-cream text-darktext border border-bordercream',
    muted: 'bg-warmwhite text-mutedtext border border-bordercream',
    error: 'bg-red-50 text-errorred border border-errorred/30'
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wide',
    md: 'text-xs px-2.5 py-1 tracking-wider',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full uppercase transition-colors ${
        variantStyles[variant] || variantStyles.gold
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
