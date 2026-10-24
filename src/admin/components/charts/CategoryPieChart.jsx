import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const COLORS = ['#6D281B', '#E9A52B', '#344B32', '#863524'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-warmwhite p-2.5 rounded-brand border border-bordercream shadow-soft text-xs space-y-0.5">
        <p className="font-bold text-darktext">{data.name}</p>
        <p className="text-maroon font-bold">Revenue: {formatCurrency(data.value)}</p>
        <p className="text-mutedtext">{data.payload.percent}% of total sales</p>
      </div>
    );
  }
  return null;
};

export const CategoryPieChart = ({ products = [] }) => {
  // Aggregate sales/revenue by category from products
  const categoryDataMap = {};
  products.forEach((p) => {
    const cat = p.categoryName || 'Other';
    const rev = (p.unitsSold || 20) * (p.price || 130);
    categoryDataMap[cat] = (categoryDataMap[cat] || 0) + rev;
  });

  const total = Object.values(categoryDataMap).reduce((a, b) => a + b, 0) || 1;

  const data = Object.keys(categoryDataMap).map((cat) => ({
    name: cat,
    value: categoryDataMap[cat],
    percent: Math.round((categoryDataMap[cat] / total) * 100)
  }));

  return (
    <div className="bg-warmwhite rounded-brand-lg border border-bordercream/80 p-5 shadow-soft space-y-3">
      <div>
        <h3 className="font-display font-bold text-base sm:text-lg text-darktext">
          Sales by Category
        </h3>
        <p className="text-xs text-mutedtext">Revenue share across traditional crafts</p>
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry) => (
                <span className="text-xs text-darktext font-medium ml-1">
                  {value} ({entry.payload.percent}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPieChart;
