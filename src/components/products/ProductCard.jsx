import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatCurrency';
import ImageFallback from '../common/ImageFallback';
import Badge from '../common/Badge';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Pack size selection state
  const availableSizes = product.availableSizes || [{ size: 'Standard', price: product.price }];
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const isFavorited = isInWishlist(product.slug);
  const currentPrice = selectedSize.price || product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedSize, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <article className="group bg-warmwhite rounded-brand-lg border border-bordercream/80 hover:border-gold/60 shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image Container with Badges - Uniform Height Across Cards */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-cream/40">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <ImageFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <Badge
              variant={product.badge === 'Bestseller' ? 'maroon' : 'gold'}
              size="sm"
            >
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-all ${
            isFavorited
              ? 'bg-warmwhite text-maroon shadow-md'
              : 'bg-warmwhite/80 hover:bg-warmwhite text-mutedtext hover:text-maroon'
          }`}
          aria-label={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
          title={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Heart className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-maroon scale-110' : ''}`} />
        </button>

        {/* Quick View Button (hover on desktop) */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10 items-center gap-1.5 px-3 py-1.5 rounded-full bg-warmwhite/90 hover:bg-warmwhite text-xs font-semibold text-darktext shadow-md border border-bordercream"
          >
            <Eye className="w-3.5 h-3.5 text-maroon" />
            <span>Quick View</span>
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Tamil Name */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-gold-dark uppercase tracking-wider">
              {product.categoryName}
            </span>
            {product.tamilName && (
              <span className="text-[11px] text-mutedtext font-tamil font-medium">
                {product.tamilName}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-display font-bold text-base sm:text-lg text-darktext group-hover:text-maroon transition-colors line-clamp-1 mb-1.5">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-mutedtext line-clamp-2 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Pack Size Selector */}
          {availableSizes.length > 1 && (
            <div className="mb-4">
              <span className="block text-[11px] font-semibold text-mutedtext uppercase tracking-wider mb-1.5">
                Pack Size:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {availableSizes.map((sizeObj) => (
                  <button
                    key={sizeObj.size}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(sizeObj);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-brand border transition-all ${
                      selectedSize.size === sizeObj.size
                        ? 'border-maroon bg-maroon/10 text-maroon font-bold'
                        : 'border-bordercream bg-warmwhite text-darktext hover:bg-cream'
                    }`}
                  >
                    {sizeObj.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-3 border-t border-bordercream/60 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-base sm:text-lg text-maroon">
                {formatCurrency(currentPrice)}
              </span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="text-xs text-mutedtext line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-mutedtext block">
              Inclusive of taxes
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-brand text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isAddedRecently
                ? 'bg-forest text-warmwhite'
                : 'bg-maroon hover:bg-maroon-light active:bg-maroon-dark text-warmwhite'
            }`}
            aria-label={`Add ${product.name} (${selectedSize.size}) to cart`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4 text-warmwhite" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
