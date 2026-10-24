import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  Package,
  Layers,
  TrendingUp,
  AlertTriangle,
  Boxes,
  Award,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { useAdmin } from '../context/AdminContext';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import StatusBadge from '../components/common/StatusBadge';
import { formatCurrency } from '../utils/formatters';
import { getTopSellingProducts } from '../utils/adminCalculations';

export default function ProductAnalytics() {
  const { products, orders, categories } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [metricType, setMetricType] = useState('units'); // 'units' | 'revenue'

  // Summary KPIs
  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.status === 'published').length;
  const draftProducts = products.filter((p) => p.status === 'draft').length;
  const lowStockCount = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 15) && p.stock > 0
  ).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      return selectedCategory === 'all' || p.category === selectedCategory;
    });
  }, [products, selectedCategory]);

  // Aggregate product performance from actual orders
  const productPerformance = useMemo(() => {
    return filteredProducts.map((prod) => {
      let units = 0;
      let revenue = 0;

      orders.forEach((ord) => {
        if (ord.items) {
          ord.items.forEach((item) => {
            if (
              item.id === prod.id ||
              item.name.toLowerCase() === prod.name.toLowerCase()
            ) {
              const q = Number(item.quantity) || 1;
              units += q;
              revenue += (item.price || prod.price) * q;
            }
          });
        }
      });

      return {
        ...prod,
        unitsSold: units,
        revenue: revenue
      };
    }).sort((a, b) => {
      return metricType === 'units'
        ? b.unitsSold - a.unitsSold
        : b.revenue - a.revenue;
    });
  }, [filteredProducts, orders, metricType]);

  const totalUnitsSold = productPerformance.reduce((acc, p) => acc + p.unitsSold, 0);
  const bestPerformer = productPerformance[0];

  // Prepare chart data (Top 6)
  const chartData = productPerformance.slice(0, 6).map((p) => ({
    name: p.name.length > 14 ? p.name.substring(0, 14) + '...' : p.name,
    fullName: p.name,
    unitsSold: p.unitsSold,
    revenue: p.revenue
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Product Performance & Analytics
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Evaluate snack sales volume, revenue velocity, stock rotation and category mix
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold capitalize"
          >
            <option value="all">All Snack Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-3.5 rounded-xl border border-[#E8DDCB] shadow-xs">
          <span className="text-[11px] text-muted font-medium block">Total Catalogue</span>
          <p className="text-lg font-bold text-darktext mt-0.5">{totalProducts} Snacks</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DDCB] shadow-xs">
          <span className="text-[11px] text-forest font-medium block">Published Live</span>
          <p className="text-lg font-bold text-forest mt-0.5">{publishedProducts} Active</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DDCB] shadow-xs">
          <span className="text-[11px] text-muted font-medium block">Draft Items</span>
          <p className="text-lg font-bold text-darktext mt-0.5">{draftProducts} Drafts</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DDCB] shadow-xs">
          <span className="text-[11px] text-amber-600 font-medium block">Low Stock Alert</span>
          <p className="text-lg font-bold text-amber-600 mt-0.5">{lowStockCount} Items</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DDCB] shadow-xs">
          <span className="text-[11px] text-maroon font-medium block">Total Units Sold</span>
          <p className="text-lg font-bold text-maroon mt-0.5">{totalUnitsSold} Packs</p>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-[#E8DDCB] shadow-xs">
          <span className="text-[11px] text-gold-dark font-medium block">Top Performer</span>
          <p className="text-xs font-bold text-darktext mt-0.5 truncate">
            {bestPerformer?.name || 'N/A'}
          </p>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Product Bar Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-darktext">
                Top Performing Snacks Comparison
              </h3>
              <p className="text-xs text-muted">
                Ranked by {metricType === 'units' ? 'units ordered' : 'gross revenue generated'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 p-1 bg-warmwhite rounded-lg border border-[#E8DDCB]">
              <button
                onClick={() => setMetricType('units')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded ${
                  metricType === 'units'
                    ? 'bg-maroon text-white shadow-xs'
                    : 'text-muted hover:text-darktext'
                }`}
              >
                Units Sold
              </button>
              <button
                onClick={() => setMetricType('revenue')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded ${
                  metricType === 'revenue'
                    ? 'bg-maroon text-white shadow-xs'
                    : 'text-muted hover:text-darktext'
                }`}
              >
                Revenue (₹)
              </button>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E8DDCB"
                  opacity={0.6}
                />
                <XAxis
                  dataKey="name"
                  stroke="#766D64"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E8DDCB' }}
                />
                <YAxis
                  stroke="#766D64"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E8DDCB' }}
                  tickFormatter={(val) =>
                    metricType === 'revenue' ? `₹${val}` : val
                  }
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-2.5 rounded-lg shadow-lg border border-[#E8DDCB] text-xs">
                          <p className="font-bold text-darktext">{data.fullName}</p>
                          <p className="text-maroon font-semibold mt-1">
                            {metricType === 'revenue'
                              ? `Revenue: ${formatCurrency(data.revenue)}`
                              : `Sold: ${data.unitsSold} packs`}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey={metricType === 'units' ? 'unitsSold' : 'revenue'}
                  fill="#6D281B"
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#6D281B' : '#E9A52B'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Share Donut (1 col) */}
        <div className="lg:col-span-1">
          <CategoryPieChart products={products} orders={orders} />
        </div>
      </div>

      {/* Comprehensive Product Performance Table */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
        <div className="p-4 bg-warmwhite border-b border-[#E8DDCB] flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-darktext">
            Individual Snack Performance Matrix
          </h3>
          <span className="text-xs text-muted">
            Showing {productPerformance.length} products
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmwhite/60 text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
              <tr>
                <th className="py-3 px-4">Snack Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Base Price</th>
                <th className="py-3 px-3 text-center">Current Stock</th>
                <th className="py-3 px-3 text-right">Units Sold</th>
                <th className="py-3 px-3 text-right">Gross Sales</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCB]/50">
              {productPerformance.map((prod, idx) => (
                <tr key={prod.id} className="hover:bg-cream/20 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-bold text-muted w-4">
                        #{idx + 1}
                      </span>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-8 h-8 rounded object-cover border border-[#E8DDCB]"
                        onError={(e) => {
                          e.target.src = '/images/hero_snack_spread.jpg';
                        }}
                      />
                      <div>
                        <p className="font-semibold text-darktext">{prod.name}</p>
                        <span className="text-[10px] text-muted font-mono">{prod.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 capitalize text-muted">{prod.category}</td>
                  <td className="py-3 px-3 font-mono text-darktext">
                    {formatCurrency(prod.price)}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-darktext">
                    {prod.stock}
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-darktext font-mono">
                    {prod.unitsSold} packs
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-maroon font-mono">
                    {formatCurrency(prod.revenue)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <StatusBadge status={prod.status || 'published'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
