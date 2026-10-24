import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  trendType = 'up', // 'up' | 'down' | 'neutral'
  subtitle,
  onClick,
  badgeText,
  colorScheme = 'maroon' // 'maroon' | 'gold' | 'forest' | 'blue' | 'rose'
}) => {
  const colorMap = {
    maroon: {
      iconBg: 'bg-maroon/10 text-maroon',
      badge: 'bg-maroon/10 text-maroon'
    },
    gold: {
      iconBg: 'bg-gold-soft text-gold-dark',
      badge: 'bg-gold-soft text-gold-dark'
    },
    forest: {
      iconBg: 'bg-forest/10 text-forest',
      badge: 'bg-forest/10 text-forest'
    },
    blue: {
      iconBg: 'bg-blue-50 text-blue-700',
      badge: 'bg-blue-50 text-blue-700'
    },
    rose: {
      iconBg: 'bg-rose-50 text-rose-700',
      badge: 'bg-rose-50 text-rose-700'
    }
  };

  const scheme = colorMap[colorScheme] || colorMap.maroon;

  return (
    <div
      onClick={onClick}
      className={`bg-warmwhite rounded-brand-lg border border-bordercream/80 p-5 shadow-soft hover:shadow-soft-md transition-all duration-200 flex flex-col justify-between ${
        onClick ? 'cursor-pointer hover:border-gold/60' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-mutedtext leading-snug">
          {label}
        </span>
        {Icon && (
          <div className={`w-10 h-10 rounded-brand flex items-center justify-center flex-shrink-0 ${scheme.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-2xl sm:text-3xl text-darktext tracking-tight">
            {value}
          </span>
          {badgeText && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${scheme.badge}`}>
              {badgeText}
            </span>
          )}
        </div>

        {(trend || subtitle) && (
          <div className="flex items-center gap-2 pt-1 text-xs">
            {trend && (
              <span
                className={`inline-flex items-center font-bold ${
                  trendType === 'up'
                    ? 'text-forest'
                    : trendType === 'down'
                    ? 'text-rose-600'
                    : 'text-mutedtext'
                }`}
              >
                {trendType === 'up' && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
                {trendType === 'down' && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
                {trend}
              </span>
            )}
            {subtitle && <span className="text-mutedtext truncate">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
