import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Phone, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { siteConfig } from '../../data/siteConfig';

export const MobileNav = ({ isOpen, onClose }) => {
  const { wishlistCount } = useWishlist();
  const { totalCount, openCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darktext/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-warmwhite shadow-2xl flex flex-col border-r border-bordercream animate-fade-in">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-bordercream flex items-center justify-between bg-cream/40">
          <Link to="/" onClick={onClose} className="flex flex-col">
            <span className="font-display font-extrabold text-2xl tracking-wider text-maroon">
              RAJI SNACKS
            </span>
            <span className="text-[10px] tracking-widest text-gold-dark font-bold uppercase">
              Heritage Savouries • Estd. Tradition
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-mutedtext hover:text-darktext hover:bg-cream"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div className="space-y-1">
            <NavLink
              to="/"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-brand font-medium text-base transition-colors ${
                  isActive ? 'bg-maroon text-warmwhite font-bold' : 'text-darktext hover:bg-cream'
                }`
              }
            >
              <span>Home</span>
            </NavLink>

            <NavLink
              to="/shop"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-brand font-medium text-base transition-colors ${
                  isActive ? 'bg-maroon text-warmwhite font-bold' : 'text-darktext hover:bg-cream'
                }`
              }
            >
              <span>Shop All Snacks</span>
              <span className="text-xs bg-gold-soft px-2 py-0.5 rounded text-maroon font-bold">7 Items</span>
            </NavLink>

            {/* Categories Submenu */}
            <div className="pt-2 pb-1">
              <span className="px-3 text-xs font-bold uppercase tracking-wider text-mutedtext">
                Explore Categories
              </span>
              <div className="mt-2 space-y-1 pl-2">
                {categories.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-brand text-sm font-medium transition-colors ${
                        isActive ? 'text-maroon font-bold bg-cream' : 'text-darktext hover:text-maroon hover:bg-cream/50'
                      }`
                    }
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-mutedtext">({cat.productCount})</span>
                  </NavLink>
                ))}
              </div>
            </div>

            <NavLink
              to="/about"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-brand font-medium text-base transition-colors ${
                  isActive ? 'bg-maroon text-warmwhite font-bold' : 'text-darktext hover:bg-cream'
                }`
              }
            >
              <span>Our Story</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-brand font-medium text-base transition-colors ${
                  isActive ? 'bg-maroon text-warmwhite font-bold' : 'text-darktext hover:bg-cream'
                }`
              }
            >
              <span>Contact Us</span>
            </NavLink>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-bordercream space-y-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                openCart();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-brand bg-cream/60 hover:bg-cream text-darktext text-sm font-semibold transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-maroon" />
                <span>Shopping Cart</span>
              </div>
              <span className="bg-maroon text-warmwhite text-xs px-2 py-0.5 rounded-full font-bold">
                {totalCount}
              </span>
            </button>

            <Link
              to="/shop?wishlist=true"
              onClick={onClose}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-brand bg-cream/60 hover:bg-cream text-darktext text-sm font-semibold transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 text-maroon" />
                <span>My Favourites</span>
              </div>
              <span className="bg-gold-soft text-maroon text-xs px-2 py-0.5 rounded-full font-bold border border-gold/40">
                {wishlistCount}
              </span>
            </Link>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="p-5 border-t border-bordercream bg-cream/20 text-xs text-mutedtext space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-maroon" />
            <span>{siteConfig.contact.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-maroon" />
            <span>{siteConfig.contact.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
