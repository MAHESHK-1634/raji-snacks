import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { products } from '../../data/products';
import { formatCurrency } from '../../utils/formatCurrency';
import ImageFallback from './ImageFallback';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim()
    ? products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.name.toLowerCase().includes(query) ||
          p.tamilName?.toLowerCase().includes(query) ||
          p.categoryName.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.ingredients?.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleViewAllResults = (e) => {
    e.preventDefault();
    onClose();
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  const quickTags = ['Garlic', 'Thenkuzhal', 'Madurai Mixture', 'Kara Sevu', 'Murukku'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darktext/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-2xl bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft-lg z-10 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Search Raji Snacks"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-bordercream bg-cream/30">
          <Search className="w-5 h-5 text-maroon flex-shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchTerm.trim()) {
                handleViewAllResults(e);
              }
            }}
            placeholder="Search our fresh handcrafted savouries..."
            className="w-full bg-transparent text-base sm:text-lg text-darktext placeholder:text-mutedtext focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="p-1 rounded-full text-mutedtext hover:text-darktext mr-2"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1 rounded bg-cream border border-bordercream text-darktext hover:bg-gold-soft"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-6 py-3 border-b border-bordercream/50 bg-warmwhite flex items-center gap-2 overflow-x-auto text-xs text-mutedtext">
          <span className="font-semibold text-darktext flex-shrink-0">Popular:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchTerm(tag)}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-cream/70 hover:bg-gold-soft text-darktext transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-bordercream/40">
          {searchTerm.trim() ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase text-mutedtext pb-1">
                  <span>Found {filteredProducts.length} snacks</span>
                  <button
                    type="button"
                    onClick={handleViewAllResults}
                    className="text-maroon hover:underline flex items-center gap-1 font-bold lowercase"
                  >
                    <span>view all in shop</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p.slug)}
                    className="flex items-center gap-3.5 p-2.5 rounded-brand hover:bg-cream/50 cursor-pointer transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-brand overflow-hidden flex-shrink-0 border border-bordercream">
                      <ImageFallback
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs uppercase font-semibold text-gold-dark tracking-wider">
                          {p.categoryName}
                        </span>
                        {p.bestseller && (
                          <span className="text-[10px] bg-maroon/10 text-maroon font-bold px-1.5 py-0.2 rounded">
                            Bestseller
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-darktext text-sm sm:text-base group-hover:text-maroon transition-colors truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-mutedtext truncate">
                        {p.shortDescription}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 pl-2">
                      <span className="font-bold text-sm sm:text-base text-darktext">
                        {formatCurrency(p.price)}
                      </span>
                      <span className="block text-[11px] text-mutedtext">
                        from {p.availableSizes?.[0]?.size || '200g'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="font-display text-lg font-bold text-darktext mb-1">
                  No snacks match "{searchTerm}"
                </p>
                <p className="text-xs sm:text-sm text-mutedtext max-w-sm mx-auto mb-4">
                  Check the spelling or try searching for classic favourites like Murukku, Mixture, or Kara Sevu.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/shop');
                  }}
                  className="text-xs font-bold uppercase tracking-wider text-maroon hover:underline"
                >
                  Browse Full Catalogue →
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-8 text-mutedtext">
              <Search className="w-8 h-8 mx-auto mb-2 text-bordercream" />
              <p className="text-sm font-medium">Type a snack name, spice, or category to start searching</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
