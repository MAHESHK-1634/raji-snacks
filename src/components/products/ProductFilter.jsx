import React from 'react';
import { Search, X, RotateCcw, Filter } from 'lucide-react';
import { categories } from '../../data/categories';
import { formatCurrency } from '../../utils/formatCurrency';

export const ProductFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  maxPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="bg-warmwhite rounded-brand-lg border border-bordercream p-5 shadow-soft space-y-6">
      
      {/* Header with results count & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-bordercream/70">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-maroon" />
          <h3 className="font-display font-bold text-darktext text-base">Filter Snacks</h3>
        </div>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-mutedtext hover:text-maroon flex items-center gap-1 font-semibold transition-colors"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or ingredient..."
            className="w-full bg-cream/40 border border-bordercream rounded-brand px-3 py-2 pl-9 text-xs sm:text-sm text-darktext placeholder:text-mutedtext focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon"
          />
          <Search className="w-4 h-4 text-mutedtext absolute left-3 top-2.5" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-mutedtext hover:text-darktext p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-2.5">
          Categories
        </label>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-brand text-xs sm:text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-maroon text-warmwhite font-bold'
                : 'bg-warmwhite hover:bg-cream text-darktext border border-bordercream/60'
            }`}
          >
            <span>All Snacks</span>
            <span className="text-xs opacity-75">7</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-brand text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-maroon text-warmwhite font-bold'
                  : 'bg-warmwhite hover:bg-cream text-darktext border border-bordercream/60'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-xs opacity-75">{cat.productCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2">
          <label className="font-bold text-darktext uppercase tracking-wider">
            Max Price
          </label>
          <span className="font-bold text-maroon">
            Up to {formatCurrency(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="120"
          max="200"
          step="5"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-maroon cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-mutedtext mt-1">
          <span>₹120</span>
          <span>₹200</span>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-darktext uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-cream/40 border border-bordercream rounded-brand px-3 py-2 text-xs sm:text-sm text-darktext focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon cursor-pointer"
        >
          <option value="featured">Featured / Curated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Stock availability */}
      <div className="pt-2 border-t border-bordercream/60">
        <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-darktext font-medium select-none">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-maroon accent-maroon focus:ring-maroon"
          />
          <span>In-Stock Only</span>
        </label>
      </div>

      {/* Footer result count */}
      <div className="pt-2 text-center text-xs text-mutedtext">
        Showing <strong className="text-darktext">{totalResults}</strong> handcrafted items
      </div>
    </div>
  );
};

export default ProductFilter;
