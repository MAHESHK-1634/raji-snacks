import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, ArrowLeft, Truck, ShieldCheck } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import QuantitySelector from '../components/common/QuantitySelector';
import ImageFallback from '../components/common/ImageFallback';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';

export const CartPage = () => {
  const {
    cartItems,
    subtotal,
    shippingFee,
    shippingThreshold,
    amountForFreeShipping,
    totalSavings,
    grandTotal,
    totalCount,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Cart' }]} />

        {/* Page Title */}
        <div className="mt-4 mb-8 pb-4 border-b border-bordercream/70 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-mutedtext text-sm mt-1">
              Review your handcrafted selections before proceeding to delivery details.
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold text-mutedtext hover:text-errorred transition-colors self-start sm:self-auto"
            >
              Clear Cart
            </button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Cart Items Table / List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Free Shipping Alert banner */}
              <div className="p-4 rounded-brand bg-cream/60 border border-bordercream flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-maroon flex-shrink-0" />
                  {amountForFreeShipping > 0 ? (
                    <span>
                      Add <strong className="text-maroon font-bold">{formatCurrency(amountForFreeShipping)}</strong> more to unlock <strong className="text-forest font-bold">Free Delivery</strong>!
                    </span>
                  ) : (
                    <span className="text-forest font-semibold">
                      🎉 Your order qualifies for <strong>Free Express Delivery</strong>!
                    </span>
                  )}
                </div>
                <span className="text-xs text-mutedtext hidden sm:inline">
                  Free over ₹{shippingThreshold}
                </span>
              </div>

              {/* Items Card */}
              <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft overflow-hidden divide-y divide-bordercream/60">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    
                    {/* Item Thumbnail & Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-20 h-20 rounded-brand overflow-hidden flex-shrink-0 border border-bordercream bg-cream">
                        <ImageFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[11px] font-bold text-gold-dark uppercase tracking-wider block">
                          {item.categoryName}
                        </span>
                        <Link
                          to={`/product/${item.slug}`}
                          className="font-display font-bold text-base sm:text-lg text-darktext hover:text-maroon transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-xs text-mutedtext">
                          <span className="bg-cream px-2.5 py-0.5 rounded font-medium border border-bordercream/70">
                            Pack: {item.size}
                          </span>
                          <span>{formatCurrency(item.price)} each</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector & Item Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-bordercream/40">
                      <QuantitySelector
                        size="md"
                        quantity={item.quantity}
                        max={item.maxStock}
                        onChange={(newQty) => updateQuantity(item.id, newQty)}
                      />

                      <div className="text-right min-w-[5rem]">
                        <span className="font-display font-bold text-base sm:text-lg text-darktext block">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-mutedtext block">
                            {item.quantity} × {formatCurrency(item.price)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-mutedtext hover:text-errorred hover:bg-cream/80 rounded-brand transition-colors"
                        title="Remove item from cart"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-maroon hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Exploring Snacks</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft-md p-6 space-y-4">
                <h3 className="font-display font-bold text-xl text-darktext pb-3 border-b border-bordercream/60">
                  Order Summary
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-mutedtext">
                  <div className="flex justify-between">
                    <span>Items Subtotal ({totalCount} {totalCount === 1 ? 'pack' : 'packs'})</span>
                    <span className="font-semibold text-darktext">{formatCurrency(subtotal)}</span>
                  </div>

                  {totalSavings > 0 && (
                    <div className="flex justify-between text-forest font-semibold">
                      <span>Total Savings</span>
                      <span>- {formatCurrency(totalSavings)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery Estimate</span>
                    <span className="font-semibold text-darktext">
                      {shippingFee === 0 ? <strong className="text-forest">FREE</strong> : formatCurrency(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-bordercream flex justify-between items-baseline text-base sm:text-lg font-bold text-darktext">
                    <span>Estimated Total</span>
                    <span className="font-display font-extrabold text-2xl text-maroon">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                  <span className="block text-[11px] text-mutedtext text-right -mt-1">
                    GST and all taxes included
                  </span>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-md"
                    onClick={() => navigate('/checkout')}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1 text-gold" />
                  </Button>
                </div>

                {/* Secure Trust Notice */}
                <div className="pt-4 border-t border-bordercream/70 flex items-center justify-center gap-2 text-[11px] text-mutedtext">
                  <ShieldCheck className="w-4 h-4 text-forest" />
                  <span>Secure checkout demonstration • High standard hygiene</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-cream mx-auto flex items-center justify-center text-maroon mb-4 border border-bordercream">
              <ShoppingBag className="w-10 h-10 opacity-60" />
            </div>
            <h2 className="font-display font-bold text-2xl text-darktext mb-2">
              Your cart is waiting for good food
            </h2>
            <p className="text-mutedtext text-sm mb-6 leading-relaxed">
              You haven't added any traditional South Indian snacks to your basket yet.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Explore Traditional Favourites
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
