import React from 'react';
import { siteConfig } from '../../data/siteConfig';
import ImageFallback from '../common/ImageFallback';

export const SnackMoments = () => {
  return (
    <section className="py-16 sm:py-20 bg-warmwhite border-b border-bordercream/60">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-2">
            Everyday Traditions
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Moments Made Delicious
          </h2>
          <p className="text-mutedtext text-sm sm:text-base mt-3 leading-relaxed">
            Good savouries bring people together. Here is how authentic snacks weave into cherished everyday rituals.
          </p>
        </div>

        {/* 3 Occasions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.snackMoments.map((moment) => (
            <div
              key={moment.id}
              className="group bg-cream/30 rounded-brand-xl border border-bordercream/70 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col"
            >
              <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-cream">
                <ImageFallback
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-warmwhite/90 backdrop-blur-xs text-maroon text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-bordercream">
                  {moment.tag}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-darktext group-hover:text-maroon transition-colors mb-2">
                    {moment.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-mutedtext leading-relaxed">
                    {moment.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SnackMoments;
