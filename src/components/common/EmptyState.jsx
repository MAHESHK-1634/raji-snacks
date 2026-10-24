import React from 'react';
import { Button } from './Button';
import { PackageOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = PackageOpen,
  title = 'No snacks found',
  description = 'Try adjusting your search or filters to discover authentic traditional delicacies.',
  actionLabel = 'Explore All Snacks',
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-cream/40 rounded-brand-lg border border-bordercream/70 ${className}`}>
      <div className="w-16 h-16 rounded-full bg-gold-soft/60 flex items-center justify-center mb-4 text-maroon">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="font-display text-xl sm:text-2xl font-bold text-darktext mb-2">
        {title}
      </h3>
      <p className="text-mutedtext max-w-md text-sm sm:text-base mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
