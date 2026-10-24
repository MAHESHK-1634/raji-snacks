import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import ImageFallback from '../common/ImageFallback';

export const StorySection = () => {
  return (
    <section className="py-16 sm:py-24 bg-cream/30 border-b border-bordercream/70 relative overflow-hidden">
      
      {/* Decorative Warm Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-soft/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-maroon/5 rounded-full blur-3xl pointer-events-none" />

      <div className="page-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Editorial Image with decorative frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/3] sm:h-[450px] rounded-brand-xl overflow-hidden border-2 border-bordercream shadow-soft-lg bg-cream">
              <ImageFallback
                src="/images/hero_snack_spread.jpg"
                alt="Traditional South Indian snacks served with tea in a warm home setting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-darktext/60 via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-6 left-6 right-6 text-warmwhite">
                <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                  Heritage Craftsmanship
                </span>
                <p className="font-display font-bold text-xl leading-snug">
                  The warmth of home, poured into every batch.
                </p>
              </div>
            </div>

            {/* Accent Border Frame */}
            <div className="hidden sm:block absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-gold rounded-tl-brand pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-gold rounded-br-brand pointer-events-none" />
          </div>

          {/* Right: Editorial Storytelling Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream border border-bordercream text-xs font-bold uppercase tracking-wider text-maroon">
              <span>Our Culinary Heritage</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-darktext tracking-tight leading-[1.2]">
              Tradition in <span className="text-maroon">Every Crunch.</span>
            </h2>

            <p className="text-mutedtext text-base sm:text-lg leading-relaxed">
              At Raji Snacks, our recipes are rooted in the culinary wisdom of South Indian households. Long before mass automation, snacks were prepared with mindful patience: stone-grinding aged rice flours, slowly infusing whole garlic cloves into warm oil, and hand-shaping intricate spirals.
            </p>

            <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
              We continue that sacred commitment today. Every batch of murukku, kara sevu, and mixture is prepared in small kettles to guarantee pristine crispness, rich natural aroma, and zero artificial coloring.
            </p>

            {/* Core Values checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-darktext">
                <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                <span>Pure Country Butter & Flours</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-darktext">
                <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                <span>Small Batch Hand-Frying</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-darktext">
                <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                <span>Zero Chemical Preservatives</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-darktext">
                <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0" />
                <span>Airtight Resealable Freshness</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about">
                <Button variant="primary" size="md">
                  <span>Discover Our Story</span>
                  <ArrowRight className="w-4 h-4 ml-1 text-gold" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
