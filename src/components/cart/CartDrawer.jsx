import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import QuantitySelector from '../common/QuantitySelector';
import ImageFallback from '../common/ImageFallback';
import Button from '../common/Button';

export const CartDrawer = () => {
  const {
    isCartOpen,
    closeCart,
    cartItems,
    subtotal,
    shippingFee,
    shippingThreshold,
    amountForFreeShipping,
    grandTotal,
    totalCount,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const percentToFreeShipping = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darktext/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-warmwhite shadow-2xl flex flex-col border-l border-bordercream animate-fade-in">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-bordercream flex items-center justify-between bg-cream/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-maroon/10 rounded-full text-maroon">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-darktext text-lg">Your Cart</h3>
                <span className="text-xs text-mutedtext">{totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 rounded-full text-mutedtext hover:text-darktext hover:bg-cream transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-cream/50 border-b border-bordercream text-xs">
            {amountForFreeShipping > 0 ? (
              <div className="flex items-center gap-2 text-darktext mb-1.5">
                <Truck className="w-4 h-4 text-maroon flex-shrink-0" />
                <span>
                  Add <strong className="text-maroon font-bold">{formatCurrency(amountForFreeShipping)}</strong> more to unlock <strong className="text-forest font-bold">Free Delivery</strong>!
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-forest font-semibold mb-1.5">
                <Truck className="w-4 h-4 text-forest flex-shrink-0" />
                <span>🎉 You qualify for Free Delivery!</span>
              </div>
            )}
            <div className="w-full bg-bordercream h-2 rounded-full overflow-hidden">
              <div
                className="bg-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${percentToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-bordercream/60">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="py-4 flex gap-3.5 items-start">
                  <div className="w-16 h-16 rounded-brand overflow-hidden flex-shrink-0 border border-bordercream bg-cream">
                    <ImageFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="font-display font-bold text-darktext text-sm hover:text-maroon transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-mutedtext">
                      <span className="bg-cream px-2 py-0.5 rounded font-medium border border-bordercream/70">
                        {item.size}
                      </span>
                      <span>{formatCurrency(item.price)} each</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <QuantitySelector
                        size="sm"
                        quantity={item.quantity}
                        max={item.maxStock}
                        onChange={(newQty) => updateQuantity(item.id, newQty)}
                      />

                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-darktext">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-mutedtext hover:text-errorred p-1 transition-colors"
                          title="Remove item"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="w-16 h-16 bg-cream rounded-full mx-auto flex items-center justify-center text-mutedtext mb-3">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h4 className="font-display font-bold text-darktext text-base mb-1">Your cart is empty</h4>
                <p className="text-xs text-mutedtext mb-6">Delicious handcrafted snacks are just a click away.</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                >
                  Start Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="px-6 py-5 border-t border-bordercream bg-cream/30 space-y-3">
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-mutedtext">
                  <span>Subtotal</span>
                  <span className="font-semibold text-darktext">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-mutedtext">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-darktext">
                    {shippingFee === 0 ? <span className="text-forest font-bold">FREE</span> : formatCurrency(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-darktext pt-2 border-t border-bordercream">
                  <span>Estimated Total</span>
                  <span className="text-maroon text-lg">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    closeCart();
                    navigate('/cart');
                  }}
                >
                  View Cart
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    closeCart();
                    navigate('/checkout');
                  }}
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-[11px] text-center text-mutedtext pt-1">
                Taxes included. Standard delivery across India.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
