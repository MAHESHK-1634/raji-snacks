import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Share2,
  Info
} from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ImageFallback from '../components/common/ImageFallback';
import QuantitySelector from '../components/common/QuantitySelector';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProductCard from '../components/products/ProductCard';
import { getProductBySlug, getProductsByCategory } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { formatCurrency } from '../utils/formatCurrency';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'ingredients' | 'storage'
  const [isCopied, setIsCopied] = useState(false);

  // Sync state when product slug changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes?.[0] || { size: 'Standard', price: product.price });
      setQuantity(1);
      setActiveImage(product.image);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="py-24 text-center page-container min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-display font-bold text-3xl text-darktext mb-3">Snack Not Found</h2>
        <p className="text-mutedtext text-base mb-8 max-w-md">
          The traditional snack you requested does not exist in our recipe catalogue.
        </p>
        <Link to="/shop">
          <Button variant="primary">Return to Shop</Button>
        </Link>
      </div>
    );
  }

  const currentPrice = selectedSize ? selectedSize.price : product.price;
  const isFavorited = isInWishlist(product.slug);

  // Related products from same category, excluding the current one
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      addToast({ message: 'Product link copied to clipboard!', type: 'success' });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.categoryName, href: `/category/${product.category}` },
            { label: product.name }
          ]}
        />

        {/* Product Details Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Product Imagery & Gallery (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-brand-xl overflow-hidden border-2 border-bordercream shadow-soft-lg bg-cream group">
              <ImageFallback
                src={activeImage || product.image}
                alt={product.name}
                loading="eager"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <Badge variant={product.badge === 'Bestseller' ? 'maroon' : 'gold'} size="md">
                    {product.badge}
                  </Badge>
                )}
                {product.spiceLevel && (
                  <span className="text-xs bg-warmwhite/90 backdrop-blur-xs font-semibold px-2.5 py-1 rounded-full text-darktext border border-bordercream">
                    🌶️ {product.spiceLevel}
                  </span>
                )}
              </div>

              {/* Share & Wishlist quick buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-warmwhite/90 hover:bg-warmwhite backdrop-blur-xs text-mutedtext hover:text-darktext flex items-center justify-center transition-all shadow-xs"
                  title="Share product link"
                  aria-label="Share product link"
                >
                  {isCopied ? <Check className="w-4 h-4 text-forest" /> : <Share2 className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`w-9 h-9 rounded-full bg-warmwhite/90 hover:bg-warmwhite backdrop-blur-xs flex items-center justify-center transition-all shadow-xs ${
                    isFavorited ? 'text-maroon' : 'text-mutedtext hover:text-maroon'
                  }`}
                  title={isFavorited ? 'Remove from favourites' : 'Save to favourites'}
                  aria-label={isFavorited ? 'Remove from favourites' : 'Save to favourites'}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-maroon' : ''}`} />
                </button>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-brand overflow-hidden border-2 flex-shrink-0 transition-all ${
                      (activeImage || product.image) === img
                        ? 'border-maroon shadow-soft'
                        : 'border-bordercream opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Variant Selector & Purchase (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category & Tamil Name */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <Link
                  to={`/category/${product.category}`}
                  className="font-bold text-gold-dark uppercase tracking-widest hover:underline"
                >
                  {product.categoryName}
                </Link>
                {product.tamilName && (
                  <span className="font-tamil font-medium text-mutedtext text-sm">
                    {product.tamilName}
                  </span>
                )}
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-sm font-medium text-maroon mt-1">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Price & Stock Display */}
            <div className="p-4 rounded-brand-lg bg-cream/40 border border-bordercream flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-3xl text-maroon">
                    {formatCurrency(currentPrice)}
                  </span>
                  {product.originalPrice && product.originalPrice > currentPrice && (
                    <span className="text-base text-mutedtext line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-mutedtext block mt-0.5">
                  Inclusive of all taxes • Freshness guaranteed
                </span>
              </div>

              {/* Stock Indicator */}
              <div className="text-right">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-forest-50 text-forest border border-forest/30">
                  <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
                  <span>In Stock ({product.stock} units)</span>
                </span>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Pack Size Selection */}
            {product.availableSizes && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-darktext">
                  Choose Pack Size:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.availableSizes.map((sizeObj) => (
                    <button
                      key={sizeObj.size}
                      type="button"
                      onClick={() => setSelectedSize(sizeObj)}
                      className={`py-3 px-2 rounded-brand border text-center transition-all ${
                        selectedSize?.size === sizeObj.size
                          ? 'border-maroon bg-maroon/10 text-maroon font-bold shadow-xs'
                          : 'border-bordercream bg-warmwhite text-darktext hover:bg-cream'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{sizeObj.size}</span>
                      <span className="block text-xs text-mutedtext mt-0.5">{formatCurrency(sizeObj.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart */}
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-darktext">
                Quantity:
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <QuantitySelector
                  quantity={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                  size="lg"
                  className="w-full sm:w-auto justify-between"
                />

                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 shadow-soft"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2 text-gold" />
                  <span>
                    Add to Cart • {formatCurrency(currentPrice * quantity)}
                  </span>
                </Button>
              </div>
            </div>

            {/* Trust Assurances */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-bordercream/70 text-center text-xs text-mutedtext">
              <div className="p-2.5 rounded-brand bg-cream/30 border border-bordercream/50">
                <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-maroon" />
                <span className="font-bold text-darktext block">Pure Quality</span>
                <span className="text-[10px]">No chemical additives</span>
              </div>
              <div className="p-2.5 rounded-brand bg-cream/30 border border-bordercream/50">
                <Truck className="w-4 h-4 mx-auto mb-1 text-gold-dark" />
                <span className="font-bold text-darktext block">Airtight Pack</span>
                <span className="text-[10px]">Arrives ultra-crispy</span>
              </div>
              <div className="p-2.5 rounded-brand bg-cream/30 border border-bordercream/50">
                <RotateCcw className="w-4 h-4 mx-auto mb-1 text-forest" />
                <span className="font-bold text-darktext block">Fresh Batch</span>
                <span className="text-[10px]">Prepared daily</span>
              </div>
            </div>

            {/* Information Tabs (Description / Ingredients / Storage) */}
            <div className="pt-6 border-t border-bordercream">
              <div className="flex items-center gap-6 border-b border-bordercream text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('description')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'description' ? 'text-maroon border-b-2 border-maroon font-bold' : 'text-mutedtext hover:text-darktext'
                  }`}
                >
                  Detailed Story
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'ingredients' ? 'text-maroon border-b-2 border-maroon font-bold' : 'text-mutedtext hover:text-darktext'
                  }`}
                >
                  Ingredients & Allergens
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('storage')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'storage' ? 'text-maroon border-b-2 border-maroon font-bold' : 'text-mutedtext hover:text-darktext'
                  }`}
                >
                  Storage & Shelf Life
                </button>
              </div>

              <div className="py-4 text-xs sm:text-sm text-mutedtext leading-relaxed">
                {activeTab === 'description' && (
                  <p>{product.description}</p>
                )}

                {activeTab === 'ingredients' && (
                  <div className="space-y-2">
                    <p>
                      <strong className="text-darktext">Ingredients: </strong>
                      {product.ingredients || 'Aged rice flour, roasted lentils, edible cooking oil, traditional spices, sea salt.'}
                    </p>
                    {product.allergens && (
                      <p className="text-xs bg-gold-soft/50 p-2.5 rounded border border-gold/30 text-darktext">
                        <strong>Allergen Notice: </strong>{product.allergens}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'storage' && (
                  <div className="space-y-1">
                    <p>
                      <strong className="text-darktext">Storage Instructions: </strong>
                      {product.storageInstructions || 'Store in a cool, dry place inside an airtight container.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-bordercream">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
                  From The Same Craft
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-darktext">
                  You May Also Relish
                </h3>
              </div>

              <Link
                to={`/category/${product.category}`}
                className="text-xs sm:text-sm font-bold text-maroon hover:underline"
              >
                View all in {product.categoryName} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
