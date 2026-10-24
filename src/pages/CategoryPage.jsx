import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGrid from '../components/products/ProductGrid';
import QuickViewModal from '../components/products/QuickViewModal';
import ImageFallback from '../components/common/ImageFallback';
import Button from '../components/common/Button';
import { getCategoryBySlug, categories } from '../data/categories';
import { getProductsByCategory } from '../data/products';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const category = getCategoryBySlug(categorySlug);

  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filtered and sorted products for this category
  const categoryProducts = useMemo(() => {
    if (!category) return [];
    const list = getProductsByCategory(category.slug);

    switch (sortBy) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [category, sortBy]);

  // Handle invalid category route gracefully
  if (!category) {
    return (
      <div className="py-20 text-center page-container min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-display font-bold text-2xl text-darktext mb-2">Category Not Found</h2>
        <p className="text-mutedtext text-sm mb-6 max-w-md">
          The requested category does not exist in our traditional catalogue.
        </p>
        <Link to="/shop">
          <Button variant="primary">Browse All Snacks</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: category.name }
          ]}
        />

        {/* Category Hero Banner */}
        <div className="mt-4 mb-10 relative rounded-brand-xl overflow-hidden border border-bordercream shadow-soft-lg bg-cream">
          <div className="relative w-full h-56 sm:h-72 min-h-[220px]">
            <ImageFallback
              src={category.bannerImage || category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-darktext/80 via-darktext/50 to-transparent flex items-center" />
            
            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 text-warmwhite max-w-2xl">
              <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{category.tagline}</span>
              </div>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                {category.name}
              </h1>
              {category.tamilName && (
                <span className="font-tamil text-sm text-gold-soft mt-1">
                  {category.tamilName}
                </span>
              )}
              <p className="text-warmwhite/80 text-xs sm:text-sm mt-3 leading-relaxed hidden sm:block">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-bordercream/70 gap-4">
          <div className="text-sm font-semibold text-mutedtext">
            Showing all <strong className="text-darktext">{categoryProducts.length}</strong> {category.name} {categoryProducts.length === 1 ? 'variety' : 'varieties'}
          </div>

          <div className="flex items-center gap-4">
            {/* Quick other category pills */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-xs text-mutedtext">Other categories:</span>
              {categories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <Link
                    key={c.id}
                    to={`/category/${c.slug}`}
                    className="text-xs font-semibold px-2.5 py-1 rounded-brand bg-cream hover:bg-gold-soft text-darktext border border-bordercream transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="sort-category" className="text-xs font-bold uppercase text-mutedtext">Sort:</label>
              <select
                id="sort-category"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-warmwhite border border-bordercream rounded-brand px-3 py-1.5 text-xs sm:text-sm text-darktext focus:outline-none focus:border-maroon"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid for this category */}
        <ProductGrid
          products={categoryProducts}
          columns={categoryProducts.length > 2 ? 3 : 2}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* Back Link */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-maroon hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Collections</span>
          </Link>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default CategoryPage;
