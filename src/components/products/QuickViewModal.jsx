import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import Modal from '../common/Modal';
import ImageFallback from '../common/ImageFallback';
import QuantitySelector from '../common/QuantitySelector';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/formatCurrency';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(
    product?.availableSizes?.[0] || { size: 'Standard', price: product?.price }
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);

  if (!product) return null;

  const currentPrice = selectedSize.price || product.price;
  const isFavorited = isInWishlist(product.slug);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${product.name} — Quick View`}
      maxWidth="max-w-3xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* Left: Product Images */}
        <div className="space-y-3">
          <div className="aspect-square rounded-brand-lg overflow-hidden border border-bordercream bg-cream">
            <ImageFallback
              src={activeImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Gallery Thumbnails if available */}
          {product.gallery && product.gallery.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-brand overflow-hidden border-2 flex-shrink-0 transition-all ${
                    (activeImage || product.image) === img
                      ? 'border-maroon shadow-xs'
                      : 'border-bordercream opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details & Purchase */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-gold-dark uppercase tracking-wider">
                {product.categoryName}
              </span>
              <span className="text-forest font-semibold bg-forest-50 px-2 py-0.5 rounded border border-forest/20">
                In Stock ({product.stock} available)
              </span>
            </div>
            <h2 className="font-display font-bold text-2xl text-darktext">
              {product.name}
            </h2>
            {product.tamilName && (
              <p className="text-xs text-mutedtext font-tamil font-medium mt-0.5">
                {product.tamilName}
              </p>
            )}
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pb-2 border-b border-bordercream/60">
            <span className="font-display font-extrabold text-2xl text-maroon">
              {formatCurrency(currentPrice)}
            </span>
            {product.originalPrice && product.originalPrice > currentPrice && (
              <span className="text-sm text-mutedtext line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-mutedtext ml-auto">
              Taxes included
            </span>
          </div>

          <p className="text-sm text-mutedtext leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Pack Size Pills */}
          {product.availableSizes && (
            <div>
              <label className="block text-xs font-semibold text-darktext uppercase tracking-wider mb-2">
                Select Pack Size:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {product.availableSizes.map((sizeObj) => (
                  <button
                    key={sizeObj.size}
                    type="button"
                    onClick={() => setSelectedSize(sizeObj)}
                    className={`text-xs px-3 py-1.5 rounded-brand border transition-all ${
                      selectedSize.size === sizeObj.size
                        ? 'border-maroon bg-maroon/10 text-maroon font-bold'
                        : 'border-bordercream bg-warmwhite text-darktext hover:bg-cream'
                    }`}
                  >
                    {sizeObj.size} — {formatCurrency(sizeObj.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="block text-xs font-semibold text-darktext uppercase tracking-wider mb-2">
              Quantity:
            </label>
            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={quantity}
                onChange={setQuantity}
                max={product.stock}
              />
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-brand border transition-colors ${
                  isFavorited
                    ? 'border-maroon bg-maroon/10 text-maroon'
                    : 'border-bordercream text-mutedtext hover:text-maroon hover:bg-cream'
                }`}
                title={isFavorited ? 'Remove from favourites' : 'Save to favourites'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-maroon' : ''}`} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 space-y-2">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-5 h-5 mr-2 text-gold" />
              <span>Add to Cart • {formatCurrency(currentPrice * quantity)}</span>
            </Button>

            <Link
              to={`/product/${product.slug}`}
              onClick={onClose}
              className="flex items-center justify-center gap-1.5 text-xs font-bold text-maroon hover:underline py-1 w-full text-center"
            >
              <span>View complete product details & ingredients</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
