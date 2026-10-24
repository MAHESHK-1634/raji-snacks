import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  IndianRupee,
  ShoppingCart,
  Percent,
  RotateCcw,
  CreditCard,
  Download,
  Calendar,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import SalesAreaChart from '../components/charts/SalesAreaChart';
import OrderStatusChart from '../components/charts/OrderStatusChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import StatCard from '../components/common/StatCard';
import { formatCurrency } from '../utils/formatters';
import { exportOrdersToCSV } from '../utils/exportCsv';

export default function SalesAnalytics() {
  const { orders, products } = useAdmin();

  // Filtered range
  const [selectedRange, setSelectedRange] = useState('30d'); // '7d' | '30d' | '90d' | '1y'

  // Calculations
  const metrics = useMemo(() => {
    // Only paid orders count toward collected revenue
    const paidOrders = orders.filter((o) => o.paymentStatus === 'paid');
    const refundedOrders = orders.filter((o) => o.paymentStatus === 'refunded');

    const grossSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const collectedRevenue = paidOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalDiscounts = orders.reduce((sum, o) => sum + (o.discount || 0), 0);
    const totalRefunds = refundedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
    const netRevenue = collectedRevenue - totalRefunds;
    const aov = paidOrders.length > 0 ? Math.round(collectedRevenue / paidOrders.length) : 0;

    // Payment methods breakdown
    const paymentMethods = orders.reduce((acc, o) => {
      const pm = (o.paymentMethod || 'UPI').toUpperCase();
      acc[pm] = (acc[pm] || 0) + (o.total || 0);
      return acc;
    }, {});

    return {
      grossSales,
      collectedRevenue,
      netRevenue,
      totalDiscounts,
      totalRefunds,
      aov,
      orderCount: orders.length,
      paidOrderCount: paidOrders.length,
      refundCount: refundedOrders.length,
      paymentMethods
    };
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Sales & Revenue Analytics
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Monitor verified incoming cash flows, discounts utilized, average basket size and refund metrics
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportOrdersToCSV(orders)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-darktext text-xs font-semibold hover:border-gold hover:bg-white transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-muted" />
            <span>Export Financial CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Gross Bookings"
          value={formatCurrency(metrics.grossSales)}
          period="all orders"
          icon={IndianRupee}
          color="neutral"
        />
        <StatCard
          title="Collected Revenue"
          value={formatCurrency(metrics.collectedRevenue)}
          change="+18.4%"
          changeType="positive"
          period="verified paid"
          icon={CheckCircle2}
          color="forest"
        />
        <StatCard
          title="Net Revenue"
          value={formatCurrency(metrics.netRevenue)}
          period="after refunds"
          icon={TrendingUp}
          color="maroon"
        />
        <StatCard
          title="Average Basket (AOV)"
          value={formatCurrency(metrics.aov)}
          change="+4.2%"
          changeType="positive"
          period="per paid transaction"
          icon={ShoppingCart}
          color="gold"
        />
        <StatCard
          title="Discounts Given"
          value={formatCurrency(metrics.totalDiscounts)}
          period="coupons applied"
          icon={Percent}
          color="amber"
        />
        <StatCard
          title="Refunds Total"
          value={formatCurrency(metrics.totalRefunds)}
          period={`${metrics.refundCount} cases`}
          icon={RotateCcw}
          color={metrics.totalRefunds > 0 ? 'red' : 'neutral'}
        />
      </div>

      {/* Main Sales Trend Chart */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
        <SalesAreaChart orders={orders} />
      </div>

      {/* Bottom Grid: Order Status & Category Revenue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderStatusChart orders={orders} />
        <CategoryPieChart products={products} orders={orders} />
      </div>

      {/* Payment Methods Breakdown */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-darktext mb-3">
          Revenue by Payment Channel
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(metrics.paymentMethods).map(([method, amount]) => (
            <div
              key={method}
              className="p-3.5 rounded-lg bg-warmwhite border border-[#E8DDCB] flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] text-muted uppercase font-bold">
                  {method}
                </span>
                <p className="text-base font-bold text-darktext mt-0.5">
                  {formatCurrency(amount)}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-maroon font-bold text-xs">
                {Math.round((amount / (metrics.grossSales || 1)) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
