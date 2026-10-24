import React from 'react';
import { Sparkles, HeartHandshake, Coffee, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const BrandBenefits = () => {
  const iconMap = {
    Sparkles: Sparkles,
    HeartHandshake: HeartHandshake,
    Coffee: Coffee,
    ShieldCheck: ShieldCheck
  };

  return (
    <section aria-label="Brand Benefits" className="bg-cream/40 border-b border-bordercream/70 py-8">
      <div className="page-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {siteConfig.benefits.map((benefit) => {
            const Icon = iconMap[benefit.iconName] || Sparkles;
            return (
              <div
                key={benefit.id}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 p-3.5 rounded-brand bg-warmwhite/70 border border-bordercream/60 transition-transform hover:-translate-y-0.5 duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-gold-soft flex items-center justify-center text-maroon flex-shrink-0 border border-gold/30">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-darktext text-sm sm:text-base leading-snug">
                    {benefit.title}
                  </h4>
                  <p className="text-xs text-mutedtext mt-0.5 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandBenefits;
