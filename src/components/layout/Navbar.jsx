import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { categories } from '../../data/categories';
import MobileNav from './MobileNav';
import SearchModal from '../common/SearchModal';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const { totalCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoryMenuOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `relative text-sm font-semibold tracking-wide transition-colors py-2 px-1 hover:text-maroon ${
      isActive ? 'text-maroon font-bold' : 'text-darktext'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-warmwhite/95 backdrop-blur-md shadow-soft border-b border-bordercream/80 py-3'
            : 'bg-warmwhite border-b border-bordercream/50 py-4'
        }`}
      >
        <div className="page-container flex items-center justify-between">
          
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-brand hover:bg-cream text-darktext focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Open mobile menu"
            >
              <Menu className="w-6 h-6 text-maroon" />
            </button>

            {/* Brand Wordmark */}
            <Link to="/" className="flex flex-col group">
              <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-wider text-maroon group-hover:text-maroon-light transition-colors">
                RAJI SNACKS
              </span>
              <span className="text-[10px] tracking-widest text-gold-dark font-bold uppercase -mt-1 group-hover:text-gold transition-colors">
                Traditional Heritage
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/shop" className={navLinkClass}>
              Shop All
            </NavLink>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="flex items-center gap-1 text-sm font-semibold text-darktext hover:text-maroon transition-colors py-2 px-1 focus:outline-none"
                aria-expanded={isCategoryMenuOpen}
              >
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCategoryMenuOpen ? 'rotate-180 text-maroon' : 'text-mutedtext'}`} />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50 animate-fade-in">
                  <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft-lg p-2 divide-y divide-bordercream/40">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center justify-between p-2.5 rounded-brand hover:bg-cream/60 transition-colors group"
                      >
                        <div>
                          <p className="font-display font-bold text-sm text-darktext group-hover:text-maroon transition-colors">
                            {cat.name}
                          </p>
                          <p className="text-[11px] text-mutedtext">
                            {cat.highlight}
                          </p>
                        </div>
                        <span className="text-xs bg-gold-soft text-maroon font-bold px-2 py-0.5 rounded-full">
                          {cat.productCount}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-2 px-2 pb-1">
                      <Link
                        to="/shop"
                        className="block text-center text-xs font-bold text-maroon hover:underline py-1"
                      >
                        View All Collections →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/about" className={navLinkClass}>
              Our Story
            </NavLink>

            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-brand hover:bg-cream text-darktext flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Search snacks"
              title="Search snacks"
            >
              <Search className="w-5 h-5 text-maroon" />
              <span className="hidden md:inline text-xs font-medium text-mutedtext">Search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/shop?wishlist=true"
              className="p-2 rounded-brand hover:bg-cream text-darktext relative transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label={`Wishlist with ${wishlistCount} items`}
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-maroon hover:fill-maroon/20 transition-all" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-darktext text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-warmwhite">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-brand bg-cream hover:bg-gold-soft border border-bordercream text-darktext transition-all focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label={`Shopping cart with ${totalCount} items`}
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-maroon" />
                {totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-maroon text-warmwhite text-[10px] font-bold min-w-[1.1rem] h-[1.1rem] px-1 rounded-full flex items-center justify-center animate-pulse">
                    {totalCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-maroon">
                Cart
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;
