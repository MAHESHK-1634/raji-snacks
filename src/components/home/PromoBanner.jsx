import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import ImageFallback from '../common/ImageFallback';
import Button from '../common/Button';

export const PromoBanner = () => {
  const { promoBanner } = siteConfig;
  if (!promoBanner) return null;

  return (
    <section className="py-12 sm:py-16 bg-warmwhite">
      <div className="page-container">
        <div className="relative rounded-brand-xl overflow-hidden bg-gradient-to-r from-maroon via-maroon-light to-maroon text-warmwhite border border-maroon-dark shadow-soft-lg">
          
          {/* Subtle background Kolam texture */}
          <div className="absolute inset-0 bg-kolam-subtle opacity-10 pointer-events-none" />

          {/* Decorative Gold Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-16">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warmwhite/10 text-gold text-xs font-bold uppercase tracking-widest border border-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{promoBanner.eyebrow}</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-warmwhite tracking-tight leading-tight">
                {promoBanner.title}
              </h2>

              <p className="text-warmwhite/80 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {promoBanner.description}
              </p>

              <div className="pt-2">
                <Link to={promoBanner.ctaLink}>
                  <Button variant="gold" size="lg" className="w-full sm:w-auto shadow-md">
                    <span>{promoBanner.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <p className="text-[11px] text-warmwhite/60 italic">
                *Demonstration seasonal promotion configured in mock data.
              </p>
            </div>

            {/* Right Food Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 rounded-brand-lg overflow-hidden border border-warmwhite/20 shadow-xl bg-warmwhite/10 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <ImageFallback
                  src={promoBanner.image}
                  alt={promoBanner.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
