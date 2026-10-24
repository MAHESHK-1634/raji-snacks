import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Store,
  ChevronRight,
  User,
  Settings,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminTopBar({ onOpenCommandPalette }) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setIsMobileSidebarOpen,
    resetDemoData,
    settings
  } = useAdmin();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Derive breadcrumbs from path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const getBreadcrumbName = (part, idx) => {
    if (part === 'admin' && idx === 0) return 'Admin';
    if (part === 'products') return 'Products';
    if (part === 'categories') return 'Categories';
    if (part === 'inventory') return 'Inventory';
    if (part === 'orders') return 'Orders';
    if (part === 'customers') return 'Customers';
    if (part === 'analytics') return 'Analytics';
    if (part === 'sales') return 'Sales Analytics';
    if (part === 'reports') return 'Reports';
    if (part === 'settings') return 'Settings';
    if (part === 'profile') return 'Profile';
    return part.charAt(0).toUpperCase() + part.slice(1);
  };

  return (
    <header className="h-16 bg-white border-b border-[#E8DDCB] px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left side: Hamburger + Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-darktext hover:bg-cream transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-muted">
          {pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            const routeTo = `/${pathParts.slice(0, index + 1).join('/')}`;
            const name = getBreadcrumbName(part, index);

            return (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted/50" />}
                {isLast ? (
                  <span className="font-semibold text-darktext">{name}</span>
                ) : (
                  <Link
                    to={routeTo}
                    className="hover:text-maroon transition-colors hover:underline"
                  >
                    {name}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right side: Search trigger, Storefront link, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search Button (triggers Ctrl+K command palette) */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-muted text-xs hover:border-gold hover:text-darktext transition-colors shadow-xs"
        >
          <Search className="w-3.5 h-3.5 text-muted" />
          <span className="hidden md:inline">Quick Search...</span>
          <kbd className="text-[10px] font-mono bg-cream px-1.5 py-0.5 rounded border border-[#E8DDCB] text-darktext/70">
            ⌘K
          </kbd>
        </button>

        {/* Mobile Search Icon Button */}
        <button
          onClick={onOpenCommandPalette}
          className="sm:hidden p-2 rounded-lg text-muted hover:text-darktext hover:bg-cream transition-colors"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* View Storefront Shortcut */}
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-maroon hover:bg-gold/15 transition-colors border border-maroon/20"
          title="Open customer storefront in a new tab"
        >
          <Store className="w-3.5 h-3.5 text-maroon" />
          <span>Live Store</span>
          <ExternalLink className="w-3 h-3 text-muted" />
        </Link>

        {/* Admin Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-cream transition-colors text-left"
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-maroon to-gold flex items-center justify-center text-white text-xs font-bold shadow-xs">
              AD
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-darktext leading-tight">
                Store Admin
              </p>
              <p className="text-[10px] text-muted leading-tight">
                {settings?.storeName || 'Raji Snacks'}
              </p>
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E8DDCB] py-1.5 z-50 animate-in fade-in-50 slide-in-from-top-2">
              <div className="px-4 py-2 border-b border-[#E8DDCB]">
                <p className="text-xs font-bold text-darktext">Administrator</p>
                <p className="text-[11px] text-muted truncate">
                  admin@rajisnacks.com
                </p>
              </div>

              <div className="py-1">
                <Link
                  to="/admin/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-darktext hover:bg-cream transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-muted" />
                  <span>Admin Profile</span>
                </Link>
                <Link
                  to="/admin/settings"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-darktext hover:bg-cream transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-muted" />
                  <span>Store Settings</span>
                </Link>
                <Link
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-darktext hover:bg-cream transition-colors"
                >
                  <Store className="w-3.5 h-3.5 text-muted" />
                  <span>Visit Storefront</span>
                </Link>
              </div>

              <div className="pt-1 border-t border-[#E8DDCB]">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        'Reset all admin mock records back to default demo state?'
                      )
                    ) {
                      resetDemoData();
                      setIsProfileOpen(false);
                    }
                  }}
                  className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
