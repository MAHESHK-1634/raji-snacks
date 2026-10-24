import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award } from 'lucide-react';
import Button from '../common/Button';
import ImageFallback from '../common/ImageFallback';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-warmwhite pt-8 pb-16 lg:py-20 border-b border-bordercream/60">
      
      {/* Background Decorative Kolam Grid */}
      <div className="absolute inset-0 bg-kolam-subtle opacity-30 pointer-events-none" />

      {/* Decorative Gold Radial Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-gold-soft/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Brand Headline & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream border border-bordercream text-xs font-bold uppercase tracking-wider text-maroon">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>A Taste of Tradition</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-darktext tracking-tight leading-[1.15]">
              Crunch Into <br className="hidden sm:inline" />
              <span className="text-maroon relative">
                Tradition.
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-gold opacity-75" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-mutedtext text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the timeless joy of South Indian snacking. Hand-extruded golden murukkus, fiery Madurai mixture, and bold peppery kara sevu — handcrafted in small batches using pure ingredients and heritage culinary artistry.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md">
                  <span>Shop All Snacks</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-gold" />
                </Button>
              </Link>

              <Link to="/category/murukku">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  <span>Explore Murukku Specials</span>
                </Button>
              </Link>
            </div>

            {/* Trust Highlights Strip */}
            <div className="pt-6 border-t border-bordercream/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-mutedtext font-medium">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-forest" />
                <span>Zero Artificial Colours</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                <span>Handcrafted Small Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-maroon" />
                <span>Pan-India Fresh Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Food Photography & Layered Visuals (5 cols) */}
          <div className="lg:col-span-5 relative">
            
            {/* Layered Decorative Background Shapes */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-gold-soft to-cream rounded-brand-xl transform rotate-2 -z-10 shadow-soft" />
            <div className="absolute -inset-2 bg-maroon/5 rounded-brand-xl transform -rotate-1 -z-10" />

            {/* Main Hero Image */}
            <div className="relative w-full aspect-[4/3] sm:h-[460px] rounded-brand-xl overflow-hidden border-2 border-bordercream shadow-soft-lg bg-cream">
              <ImageFallback
                src="/images/hero_snack_spread.jpg"
                alt="Golden crispy traditional South Indian Murukku and Mixture spread"
                loading="eager"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay for visual richness */}
              <div className="absolute inset-0 bg-gradient-to-t from-darktext/50 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Bottom Caption inside image */}
              <div className="absolute bottom-4 left-4 right-4 text-warmwhite pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold block">
                  Artisanal Collection
                </span>
                <p className="font-display font-bold text-lg leading-tight">
                  Golden Spiral Perfection
                </p>
              </div>
            </div>

            {/* Floating Heritage Badge */}
            <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-warmwhite border border-bordercream shadow-soft-lg p-3 sm:p-4 rounded-brand-lg flex items-center gap-3 z-20 animate-fade-in">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-maroon text-gold flex items-center justify-center flex-shrink-0 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="block font-display font-bold text-darktext text-xs sm:text-sm">
                  100% Traditional
                </span>
                <span className="text-[11px] text-mutedtext block">
                  Pure butter & stone-ground flours
                </span>
              </div>
            </div>

            {/* Floating Top Pill */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-gold-soft border border-gold/40 text-maroon font-bold text-xs px-3.5 py-1.5 rounded-full shadow-soft items-center gap-1.5 z-20">
              <Sparkles className="w-3.5 h-3.5 text-maroon" />
              <span>Fresh Batches Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
