import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X, Heart } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilter from '../components/products/ProductFilter';
import QuickViewModal from '../components/products/QuickViewModal';
import Button from '../components/common/Button';
import { products } from '../data/products';
import { useWishlist } from '../context/WishlistContext';

export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlist } = useWishlist();

  // URL Query State initializers
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const isWishlistView = searchParams.get('wishlist') === 'true';

  // Filters State
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(200);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync category or search query parameter updates
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('search');
    if (q) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('featured');
    setMaxPrice(200);
    setInStockOnly(false);
    setSearchParams({});
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let list = isWishlistView ? [...wishlist] : [...products];

    // Search query filter
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      list = list.filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.tamilName?.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.ingredients?.toLowerCase().includes(query)
        );
      });
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    list = list.filter((p) => p.price <= maxPrice);

    // In-Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'featured':
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [searchTerm, selectedCategory, maxPrice, inStockOnly, sortBy, isWishlistView, wishlist]);

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            ...(isWishlistView ? [{ label: 'My Favourites' }] : selectedCategory !== 'all' ? [{ label: selectedCategory }] : [])
          ]}
        />

        {/* Page Title & Introduction */}
        <div className="mt-4 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-bordercream/70">
          <div>
            {isWishlistView ? (
              <div className="flex items-center gap-2 text-maroon mb-1">
                <Heart className="w-5 h-5 fill-maroon" />
                <span className="text-xs font-bold uppercase tracking-widest text-gold-dark">Saved Favourites</span>
              </div>
            ) : (
              <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
                Artisanal Storefront
              </span>
            )}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
              {isWishlistView ? 'My Saved Snacks' : 'All Handcrafted Snacks'}
            </h1>
            <p className="text-mutedtext text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {isWishlistView
                ? 'Your handpicked collection of beloved South Indian savouries.'
                : 'Browse our complete catalogue of traditional murukku, signature mixtures, and spicy kara sevu. Handcrafted fresh with pure ingredients.'}
            </p>
          </div>

          {/* Mobile Filter Toggle & Count */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            <span className="text-xs sm:text-sm font-semibold text-mutedtext">
              Showing <strong className="text-darktext">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'snack' : 'snacks'}
            </span>

            <Button
              variant="secondary"
              size="sm"
              className="lg:hidden flex items-center gap-1.5"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <SlidersHorizontal className="w-4 h-4 text-maroon" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Active Filter Chips (if any filter is applied) */}
        {(searchTerm || selectedCategory !== 'all' || maxPrice < 200 || inStockOnly || isWishlistView) && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-mutedtext uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            {isWishlistView && (
              <span className="inline-flex items-center gap-1 text-xs bg-maroon text-warmwhite px-2.5 py-1 rounded-full font-medium">
                Favourites Only
                <button
                  type="button"
                  onClick={() => setSearchParams({})}
                  className="hover:opacity-75"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchTerm && (
              <span className="inline-flex items-center gap-1 text-xs bg-cream border border-bordercream text-darktext px-2.5 py-1 rounded-full font-medium">
                Keyword: "{searchTerm}"
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="hover:text-maroon"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 text-xs bg-cream border border-bordercream text-darktext px-2.5 py-1 rounded-full font-medium capitalize">
                Category: {selectedCategory}
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-maroon"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {maxPrice < 200 && (
              <span className="inline-flex items-center gap-1 text-xs bg-cream border border-bordercream text-darktext px-2.5 py-1 rounded-full font-medium">
                Price ≤ ₹{maxPrice}
                <button
                  type="button"
                  onClick={() => setMaxPrice(200)}
                  className="hover:text-maroon"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1 text-xs bg-forest-50 border border-forest/30 text-forest px-2.5 py-1 rounded-full font-medium">
                In-Stock Only
                <button
                  type="button"
                  onClick={() => setInStockOnly(false)}
                  className="hover:text-maroon"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-maroon hover:underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout (Sidebar Filters + Products Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar (1 col) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-24">
            <ProductFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              inStockOnly={inStockOnly}
              setInStockOnly={setInStockOnly}
              onResetFilters={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </aside>

          {/* Product Grid (3 cols) */}
          <main className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              columns={3}
              onQuickView={(prod) => setQuickViewProduct(prod)}
              emptyTitle={
                isWishlistView
                  ? 'Your Favourites list is empty'
                  : 'No snacks match your filters'
              }
              emptyDescription={
                isWishlistView
                  ? 'Click the heart icon on any snack card to save it for later.'
                  : 'Try clearing your search keyword, resetting the price range, or browsing all categories.'
              }
              onResetFilters={handleResetFilters}
            />
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-darktext/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-warmwhite shadow-2xl flex flex-col border-l border-bordercream overflow-y-auto p-5">
              <div className="flex items-center justify-between pb-4 border-b border-bordercream mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-maroon" />
                  <h3 className="font-display font-bold text-lg text-darktext">Filters & Sorting</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full text-mutedtext hover:text-darktext hover:bg-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
              />

              <div className="pt-6 mt-auto">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  Apply Filters ({filteredProducts.length} Results)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

export default ShopPage;
