import React from 'react';
import { Minus, Plus } from 'lucide-react';

export const QuantitySelector = ({
  quantity = 1,
  onChange,
  max = 50,
  min = 1,
  size = 'md',
  className = ''
}) => {
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base'
  };

  const buttonSizeClasses = {
    sm: 'w-7 h-full',
    md: 'w-9 h-full',
    lg: 'w-11 h-full'
  };

  return (
    <div
      className={`inline-flex items-center border border-bordercream rounded-brand bg-warmwhite overflow-hidden shadow-xs ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={`${buttonSizeClasses[size] || buttonSizeClasses.md} flex items-center justify-center text-darktext hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span
        className="px-3 min-w-[2.25rem] text-center font-bold text-darktext select-none tabular-nums"
        aria-live="polite"
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={`${buttonSizeClasses[size] || buttonSizeClasses.md} flex items-center justify-center text-darktext hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default QuantitySelector;
