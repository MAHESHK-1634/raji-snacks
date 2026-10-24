import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';
import ImageFallback from '../common/ImageFallback';

export const CategorySection = () => {
  return (
    <section className="py-16 sm:py-20 bg-warmwhite border-b border-bordercream/60">
      <div className="page-container">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-2">
            Curated Traditional Categories
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Shop by Traditional Craft
          </h2>
          <p className="text-mutedtext text-sm sm:text-base mt-3 leading-relaxed">
            From the ceremonial concentric coils of Kai Murukku to the spiced crunch of Madurai Mixture, explore each craft category.
          </p>
        </div>

        {/* Categories Grid (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group relative bg-warmwhite rounded-brand-xl border border-bordercream/80 overflow-hidden shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Category Image - Uniform Height */}
              <div className="relative w-full h-52 sm:h-60 overflow-hidden bg-cream">
                <ImageFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darktext/60 via-darktext/10 to-transparent opacity-80" />
                
                {/* Product Count Pill */}
                <div className="absolute top-4 right-4 bg-warmwhite/90 backdrop-blur-xs text-darktext text-xs font-bold px-3 py-1 rounded-full border border-bordercream shadow-xs">
                  {category.productCount} {category.productCount === 1 ? 'Variety' : 'Varieties'}
                </div>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-4 left-4 right-4 text-warmwhite">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold block mb-0.5">
                    {category.tagline}
                  </span>
                  <h3 className="font-display font-bold text-2xl leading-snug">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-warmwhite">
                <p className="text-xs sm:text-sm text-mutedtext leading-relaxed mb-4">
                  {category.description}
                </p>

                <div className="pt-3 border-t border-bordercream/60 flex items-center justify-between text-maroon font-bold text-xs sm:text-sm group-hover:text-maroon-light transition-colors">
                  <span>Explore Category</span>
                  <span className="w-7 h-7 rounded-full bg-cream group-hover:bg-gold flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
