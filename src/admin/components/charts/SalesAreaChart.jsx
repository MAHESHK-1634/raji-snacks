import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getSalesChartData } from '../../utils/adminCalculations';
import { formatCurrency } from '../../utils/formatters';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-warmwhite p-3 rounded-brand border border-bordercream shadow-soft text-xs space-y-1">
        <p className="font-bold text-darktext">{label}</p>
        <p className="text-maroon font-extrabold text-sm">
          Revenue: {formatCurrency(payload[0].value)}
        </p>
        {payload[1] && (
          <p className="text-mutedtext font-medium">
            Orders: {payload[1].value}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const SalesAreaChart = ({ orders = [] }) => {
  const [period, setPeriod] = useState('30d');
  const chartData = getSalesChartData(orders, period);

  return (
    <div className="bg-warmwhite rounded-brand-lg border border-bordercream/80 p-5 shadow-soft space-y-4">
      {/* Header with period toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-bordercream/60">
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg text-darktext">
            Sales & Revenue Performance
          </h3>
          <p className="text-xs text-mutedtext">
            Historical sales trajectory from verified customer orders
          </p>
        </div>

        <div className="inline-flex items-center p-1 bg-cream/60 rounded-brand border border-bordercream self-start sm:self-auto text-xs">
          {[
            { id: '7d', label: '7D' },
            { id: '30d', label: '30D' },
            { id: '90d', label: '90D' },
            { id: '1y', label: '1Y' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPeriod(item.id)}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                period === item.id
                  ? 'bg-warmwhite text-maroon shadow-xs'
                  : 'text-mutedtext hover:text-darktext'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 sm:h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6D281B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6D281B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DDCB" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="#766D64"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E8DDCB' }}
            />
            <YAxis
              stroke="#766D64"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6D281B"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAreaChart;
