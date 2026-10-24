import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { getOrderStatusBreakdown } from '../../utils/adminCalculations';

const STATUS_COLORS = {
  Pending: '#D97706',
  Confirmed: '#2563EB',
  Processing: '#4F46E5',
  Packed: '#7C3AED',
  Shipped: '#0891B2',
  Delivered: '#059669',
  Cancelled: '#E11D48'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-warmwhite p-2.5 rounded-brand border border-bordercream shadow-soft text-xs space-y-0.5">
        <p className="font-bold text-darktext">{data.status} Orders</p>
        <p className="text-maroon font-bold">{data.count} orders</p>
      </div>
    );
  }
  return null;
};

export const OrderStatusChart = ({ orders = [] }) => {
  const data = getOrderStatusBreakdown(orders);

  return (
    <div className="bg-warmwhite rounded-brand-lg border border-bordercream/80 p-5 shadow-soft space-y-3">
      <div>
        <h3 className="font-display font-bold text-base sm:text-lg text-darktext">
          Orders by Fulfilment Stage
        </h3>
        <p className="text-xs text-mutedtext">Current pipeline status across active orders</p>
      </div>

      <div className="w-full h-64 sm:h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DDCB" vertical={false} />
            <XAxis
              dataKey="status"
              stroke="#766D64"
              fontSize={10}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
            />
            <YAxis stroke="#766D64" fontSize={11} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.status] || '#6D281B'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderStatusChart;
