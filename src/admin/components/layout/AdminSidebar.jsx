import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Boxes,
  ShoppingCart,
  Users,
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Store,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminSidebar() {
  const location = useLocation();
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    orders,
    products
  } = useAdmin();

  // Computed badges
  const pendingOrdersCount = orders.filter((o) => o.orderStatus === 'pending').length;
  const lowStockCount = products.filter((p) => p.stock <= p.lowStockThreshold).length;

  const navGroups = [
    {
      group: 'OVERVIEW',
      items: [
        {
          name: 'Dashboard',
          path: '/admin',
          icon: LayoutDashboard,
          exact: true
        }
      ]
    },
    {
      group: 'CATALOGUE',
      items: [
        {
          name: 'Products',
          path: '/admin/products',
          icon: Package
        },
        {
          name: 'Categories',
          path: '/admin/categories',
          icon: Layers
        },
        {
          name: 'Inventory',
          path: '/admin/inventory',
          icon: Boxes,
          badge: lowStockCount > 0 ? lowStockCount : null,
          badgeColor: 'bg-amber-500 text-white'
        }
      ]
    },
    {
      group: 'SALES',
      items: [
        {
          name: 'Orders',
          path: '/admin/orders',
          icon: ShoppingCart,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
          badgeColor: 'bg-maroon text-white'
        },
        {
          name: 'Customers',
          path: '/admin/customers',
          icon: Users
        }
      ]
    },
    {
      group: 'ANALYTICS',
      items: [
        {
          name: 'Product Analytics',
          path: '/admin/analytics/products',
          icon: BarChart3
        },
        {
          name: 'Sales Analytics',
          path: '/admin/analytics/sales',
          icon: TrendingUp
        },
        {
          name: 'Reports',
          path: '/admin/reports',
          icon: FileSpreadsheet
        }
      ]
    },
    {
      group: 'SYSTEM',
      items: [
        {
          name: 'Settings',
          path: '/admin/settings',
          icon: Settings
        },
        {
          name: 'Admin Profile',
          path: '/admin/profile',
          icon: User
        }
      ]
    }
  ];

  const isLinkActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1F1916] text-[#F8F0DF] select-none border-r border-[#342A24]">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#342A24]">
        <Link
          to="/admin"
          onClick={() => setIsMobileSidebarOpen(false)}
          className="flex items-center gap-3 overflow-hidden group"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-maroon flex items-center justify-center shadow-md flex-shrink-0">
            <span className="font-serif font-bold text-lg text-white">R</span>
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base tracking-wide text-white group-hover:text-gold transition-colors">
                RAJI SNACKS
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-light/80">
                Admin Control Centre
              </span>
            </div>
          )}
        </Link>

        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!sidebarCollapsed ? (
              <h4 className="px-3 text-[10px] font-bold tracking-wider text-white/40 uppercase mb-1.5">
                {group.group}
              </h4>
            ) : (
              <div className="h-2" />
            )}
            {group.items.map((item) => {
              const active = isLinkActive(item);
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  title={sidebarCollapsed ? item.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all relative ${
                    active
                      ? 'bg-gradient-to-r from-maroon to-maroon/80 text-white font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  } ${sidebarCollapsed ? 'justify-center' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${
                      active ? 'text-gold scale-110' : 'text-white/60'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <span className="flex-1 truncate">{item.name}</span>
                  )}
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {/* Subtle active pip indicator */}
                  {active && !sidebarCollapsed && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  )}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer / Storefront Quick Link & Collapse Toggle */}
      <div className="p-3 border-t border-[#342A24] space-y-2">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Customer Storefront"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gold hover:text-white hover:bg-gold/10 border border-gold/20 transition-all ${
            sidebarCollapsed ? 'justify-center' : ''
          }`}
        >
          <Store className="w-4 h-4 flex-shrink-0 text-gold" />
          {!sidebarCollapsed && (
            <>
              <span className="flex-1 font-semibold">Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </>
          )}
        </Link>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex w-full items-center justify-center gap-2 py-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 text-xs transition-colors"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed/Persistent Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 z-30 flex-shrink-0 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-72 h-full bg-[#1F1916] text-[#F8F0DF] shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
