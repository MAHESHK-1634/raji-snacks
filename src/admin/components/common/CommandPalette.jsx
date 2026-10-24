import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Package, ShoppingCart, User, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { formatCurrency } from '../../utils/formatters';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { products, orders, customers } = useAdmin();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent toggles
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Matched records
  const matchedProducts = trimmed
    ? products.filter(
        (p) =>
          p.name?.toLowerCase().includes(trimmed) ||
          p.id?.toLowerCase().includes(trimmed) ||
          p.sku?.toLowerCase().includes(trimmed) ||
          (p.category || p.categoryName)?.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const matchedOrders = trimmed
    ? orders.filter(
        (o) =>
          o.id?.toLowerCase().includes(trimmed) ||
          (o.customerName || o.customer?.name)?.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  const matchedCustomers = trimmed
    ? customers.filter(
        (c) =>
          c.name?.toLowerCase().includes(trimmed) ||
          c.email?.toLowerCase().includes(trimmed) ||
          c.phone?.includes(trimmed)
      ).slice(0, 4)
    : [];

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pb-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-darktext/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div
        className="relative w-full max-w-2xl bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft-lg z-10 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Admin Global Command Search"
      >
        <div className="flex items-center px-4 py-3.5 border-b border-bordercream bg-cream/40">
          <Search className="w-5 h-5 text-maroon mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders (ORD-8901), customers, or SKU..."
            className="w-full bg-transparent text-sm sm:text-base text-darktext placeholder:text-mutedtext focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-mutedtext hover:text-darktext mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cream border border-bordercream text-mutedtext">
            ESC
          </span>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-bordercream/40 space-y-4">
          {trimmed ? (
            matchedProducts.length === 0 && matchedOrders.length === 0 && matchedCustomers.length === 0 ? (
              <div className="text-center py-8 text-xs text-mutedtext">
                No matching records found for "{query}".
              </div>
            ) : (
              <>
                {matchedProducts.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-mutedtext flex items-center gap-1.5">
                      <Package className="w-3.5 h-3.5 text-maroon" />
                      <span>Products</span>
                    </span>
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect(`/admin/products`)}
                        className="flex items-center justify-between p-2 rounded-brand hover:bg-cream/60 cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded object-cover border border-bordercream" />
                          <div>
                            <span className="font-bold text-darktext block">{p.name}</span>
                            <span className="text-[10px] text-mutedtext">{p.sku} • {p.categoryName}</span>
                          </div>
                        </div>
                        <span className="font-bold text-maroon">{formatCurrency(p.price)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchedOrders.length > 0 && (
                  <div className="space-y-1.5 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-mutedtext flex items-center gap-1.5">
                      <ShoppingCart className="w-3.5 h-3.5 text-blue-600" />
                      <span>Orders</span>
                    </span>
                    {matchedOrders.map((o) => (
                      <div
                        key={o.id}
                        onClick={() => handleSelect(`/admin/orders/${o.id}`)}
                        className="flex items-center justify-between p-2 rounded-brand hover:bg-cream/60 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-darktext block">{o.id} — {o.customerName || o.customer?.name}</span>
                          <span className="text-[10px] text-mutedtext">{o.items?.length || 1} items • Status: {o.orderStatus}</span>
                        </div>
                        <span className="font-bold text-maroon">{formatCurrency(o.total)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {matchedCustomers.length > 0 && (
                  <div className="space-y-1.5 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-mutedtext flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-forest" />
                      <span>Customers</span>
                    </span>
                    {matchedCustomers.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => handleSelect(`/admin/customers`)}
                        className="flex items-center justify-between p-2 rounded-brand hover:bg-cream/60 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-darktext block">{c.name}</span>
                          <span className="text-[10px] text-mutedtext">{c.phone} • {c.email}</span>
                        </div>
                        <span className="text-mutedtext font-medium">{c.totalOrders} orders</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )
          ) : (
            <div className="py-6 text-center text-xs text-mutedtext space-y-2">
              <p>Type to search products, orders, customers, or SKUs.</p>
              <div className="flex items-center justify-center gap-2 pt-1 text-[11px]">
                <span className="bg-cream px-2 py-0.5 rounded border border-bordercream">Garlic</span>
                <span className="bg-cream px-2 py-0.5 rounded border border-bordercream">ORD-2026-8901</span>
                <span className="bg-cream px-2 py-0.5 rounded border border-bordercream">Sundar</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
