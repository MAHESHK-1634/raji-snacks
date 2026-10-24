import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import BrandBenefits from '../components/home/BrandBenefits';
import CategorySection from '../components/home/CategorySection';
import StorySection from '../components/home/StorySection';
import PromoBanner from '../components/home/PromoBanner';
import SnackMoments from '../components/home/SnackMoments';
import NewsletterSection from '../components/home/NewsletterSection';
import ProductGrid from '../components/products/ProductGrid';
import QuickViewModal from '../components/products/QuickViewModal';
import Button from '../components/common/Button';
import { products } from '../data/products';

export const HomePage = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="space-y-0">
      
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Brand Benefits Strip */}
      <BrandBenefits />

      {/* 3. Shop by Category */}
      <CategorySection />

      {/* 4. Customer Favourites & Full Initial Catalogue (All 7 Products) */}
      <section className="py-16 sm:py-20 bg-warmwhite border-b border-bordercream/60">
        <div className="page-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gold-dark mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Signature Savouries</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
                Our Customer Favourites
              </h2>
              <p className="text-mutedtext text-sm sm:text-base mt-2 max-w-xl">
                Explore our initial artisanal collection of seven iconic recipes, prepared fresh in traditional batches.
              </p>
            </div>

            <Link to="/shop" className="flex-shrink-0">
              <Button variant="outline" size="md">
                <span>View All 7 Snacks</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Product Grid with all 7 initial products */}
          <ProductGrid
            products={products}
            columns={4}
            onQuickView={(prod) => setQuickViewProduct(prod)}
          />
        </div>
      </section>

      {/* 5. Brand Storytelling */}
      <StorySection />

      {/* 6. Featured Promotional Banner */}
      <PromoBanner />

      {/* 7. Snack Moments */}
      <SnackMoments />

      {/* 8. Newsletter Section */}
      <NewsletterSection />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default HomePage;
