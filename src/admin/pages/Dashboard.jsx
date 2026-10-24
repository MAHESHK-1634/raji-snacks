import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IndianRupee,
  ShoppingCart,
  Package,
  Users,
  Clock,
  AlertTriangle,
  Plus,
  Layers,
  FileSpreadsheet,
  ArrowRight,
  TrendingUp,
  Boxes,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import SalesAreaChart from '../components/charts/SalesAreaChart';
import OrderStatusChart from '../components/charts/OrderStatusChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import { formatCurrency, formatDate, formatTimeAgo } from '../utils/formatters';
import {
  calculateKPIs,
  getTopSellingProducts,
  getOrderStatusBreakdown
} from '../utils/adminCalculations';

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    products,
    categories,
    orders,
    customers,
    activityLogs,
    settings
  } = useAdmin();

  // Compute live KPIs from shared data
  const kpis = calculateKPIs(orders, products, customers);
  const topSellers = getTopSellingProducts(products, orders, 5);
  const lowStockProducts = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 15)
  );

  return (
    <div className="space-y-6">
      {/* Top Header / Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Operational Overview
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Real-time management metrics for {settings?.storeName || 'Raji Snacks'}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Manage Products</span>
          </Link>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold/15 text-maroon border border-gold/40 text-xs font-semibold hover:bg-gold/25 transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>View Orders</span>
          </Link>
        </div>
      </div>

      {/* 6 Key Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Total Sales"
          value={formatCurrency(kpis.totalSales)}
          change="+14.2%"
          changeType="positive"
          period="vs. last month"
          icon={IndianRupee}
          color="maroon"
        />
        <StatCard
          title="Total Orders"
          value={kpis.totalOrders}
          change="+8.6%"
          changeType="positive"
          period="vs. last month"
          icon={ShoppingCart}
          color="gold"
        />
        <StatCard
          title="Total Products"
          value={kpis.totalProducts}
          period={`${products.filter((p) => p.status === 'published').length} active`}
          icon={Package}
          color="forest"
        />
        <StatCard
          title="Total Customers"
          value={kpis.totalCustomers}
          change="+5.1%"
          changeType="positive"
          period="returning 78%"
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Pending Orders"
          value={kpis.pendingOrders}
          period="needs fulfillment"
          icon={Clock}
          color={kpis.pendingOrders > 0 ? 'amber' : 'neutral'}
        />
        <StatCard
          title="Low Stock"
          value={kpis.lowStockCount}
          period="restock required"
          icon={AlertTriangle}
          color={kpis.lowStockCount > 0 ? 'red' : 'neutral'}
        />
      </div>

      {/* Quick Action Shortcuts Strip */}
      <div className="bg-white rounded-xl p-3.5 border border-[#E8DDCB] shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
            Quick Operations
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <button
            onClick={() => navigate('/admin/products?action=new')}
            className="flex items-center gap-2 p-2 rounded-lg bg-cream/50 hover:bg-gold/15 text-darktext text-xs font-medium border border-[#E8DDCB]/60 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-maroon" />
            <span className="truncate">Add Product</span>
          </button>
          <button
            onClick={() => navigate('/admin/categories?action=new')}
            className="flex items-center gap-2 p-2 rounded-lg bg-cream/50 hover:bg-gold/15 text-darktext text-xs font-medium border border-[#E8DDCB]/60 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-maroon" />
            <span className="truncate">Add Category</span>
          </button>
          <button
            onClick={() => navigate('/admin/orders')}
            className="flex items-center gap-2 p-2 rounded-lg bg-cream/50 hover:bg-gold/15 text-darktext text-xs font-medium border border-[#E8DDCB]/60 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-maroon" />
            <span className="truncate">Process Orders</span>
          </button>
          <button
            onClick={() => navigate('/admin/inventory')}
            className="flex items-center gap-2 p-2 rounded-lg bg-cream/50 hover:bg-gold/15 text-darktext text-xs font-medium border border-[#E8DDCB]/60 transition-colors"
          >
            <Boxes className="w-3.5 h-3.5 text-maroon" />
            <span className="truncate">Manage Inventory</span>
          </button>
          <button
            onClick={() => navigate('/admin/customers')}
            className="flex items-center gap-2 p-2 rounded-lg bg-cream/50 hover:bg-gold/15 text-darktext text-xs font-medium border border-[#E8DDCB]/60 transition-colors"
          >
            <Users className="w-3.5 h-3.5 text-maroon" />
            <span className="truncate">Customer Directory</span>
          </button>
          <button
            onClick={() => navigate('/admin/reports')}
            className="flex items-center gap-2 p-2 rounded-lg bg-cream/50 hover:bg-gold/15 text-darktext text-xs font-medium border border-[#E8DDCB]/60 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-maroon" />
            <span className="truncate">View Reports</span>
          </button>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview Area Chart (2 cols) */}
        <div className="lg:col-span-2">
          <SalesAreaChart orders={orders} />
        </div>

        {/* Order Status Distribution (1 col) */}
        <div className="lg:col-span-1">
          <OrderStatusChart orders={orders} />
        </div>
      </div>

      {/* Middle Section: Top Selling Snacks & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top-Selling Products (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-darktext uppercase tracking-wide">
                Top-Selling Snacks
              </h2>
              <p className="text-xs text-muted">
                Calculated from verified customer orders
              </p>
            </div>
            <Link
              to="/admin/analytics/products"
              className="text-xs font-semibold text-maroon hover:underline flex items-center gap-1"
            >
              <span>Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                <tr>
                  <th className="py-2.5 px-3">Snack Item</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-right">Units Sold</th>
                  <th className="py-2.5 px-3 text-right">Revenue</th>
                  <th className="py-2.5 px-3 text-center">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDCB]/50">
                {topSellers.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-cream/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-muted/60 text-xs w-4">
                          #{idx + 1}
                        </span>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-9 h-9 rounded-lg object-cover border border-[#E8DDCB]"
                          onError={(e) => {
                            e.target.src = '/images/hero_snack_spread.jpg';
                          }}
                        />
                        <div>
                          <p className="font-semibold text-darktext">{item.name}</p>
                          <p className="text-[10px] text-muted">{item.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="capitalize text-muted">{item.category}</span>
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-darktext">
                      {item.unitsSold} packs
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-maroon">
                      {formatCurrency(item.revenue)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge
                        status={
                          item.stock === 0
                            ? 'out-of-stock'
                            : item.stock <= (item.lowStockThreshold || 15)
                            ? 'low-stock'
                            : 'in-stock'
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Share Chart (1 col) */}
        <div className="lg:col-span-1">
          <CategoryPieChart products={products} orders={orders} />
        </div>
      </div>

      {/* Bottom Section: Recent Orders & Inventory Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-darktext uppercase tracking-wide">
                Recent Orders
              </h2>
              <p className="text-xs text-muted">
                Latest customer transactions requiring action
              </p>
            </div>
            <Link
              to="/admin/orders"
              className="text-xs font-semibold text-maroon hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                  <th className="py-2.5 px-3 text-center">Payment</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDCB]/50">
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-cream/30 transition-colors"
                  >
                    <td className="py-3 px-3 font-semibold text-darktext">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="hover:text-maroon hover:underline"
                      >
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-darktext">
                        {order.customerName}
                      </p>
                      <p className="text-[10px] text-muted">
                        {order.items?.length || 1} items
                      </p>
                    </td>
                    <td className="py-3 px-3 text-muted">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-darktext">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/admin/orders/${order.id}`}
                        className="text-xs text-maroon hover:underline font-semibold"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inventory Stock Alerts + Recent Activity Log (1 col) */}
        <div className="space-y-6">
          {/* Low Stock Alerts Box */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-darktext">
                  Stock Threshold Alerts
                </h3>
              </div>
              <Link
                to="/admin/inventory"
                className="text-xs font-semibold text-maroon hover:underline"
              >
                Inventory
              </Link>
            </div>

            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-forest py-2">
                All snack items are adequately stocked above threshold.
              </p>
            ) : (
              <div className="space-y-2.5">
                {lowStockProducts.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-warmwhite border border-[#E8DDCB]/60"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-8 h-8 rounded object-cover border border-[#E8DDCB]"
                        onError={(e) => {
                          e.target.src = '/images/hero_snack_spread.jpg';
                        }}
                      />
                      <div>
                        <p className="text-xs font-semibold text-darktext truncate max-w-[120px]">
                          {prod.name}
                        </p>
                        <p className="text-[10px] text-muted">
                          Threshold: {prod.lowStockThreshold}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-red-600 block">
                        {prod.stock} units
                      </span>
                      <Link
                        to={`/admin/inventory?search=${encodeURIComponent(
                          prod.name
                        )}`}
                        className="text-[10px] text-maroon hover:underline"
                      >
                        Restock
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Simulated Activity Stream */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
            <h3 className="text-sm font-bold text-darktext mb-3">
              Live Activity Stream
            </h3>
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-2.5 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-darktext text-xs leading-snug">
                      {log.event}
                    </p>
                    <span className="text-[10px] text-muted">
                      {formatTimeAgo(log.time)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
