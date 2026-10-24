import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  Boxes,
  Users,
  ShoppingCart
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import {
  exportOrdersToCSV,
  exportInventoryToCSV,
  exportCustomersToCSV
} from '../utils/exportCsv';

export default function Reports() {
  const { orders, products, customers } = useAdmin();

  const [activeReport, setActiveReport] = useState('sales'); // 'sales' | 'inventory' | 'customers'

  const reportCategories = [
    {
      id: 'sales',
      name: 'Sales & Revenue Report',
      description: 'Transaction-level revenue breakdown, payment status, tax and net intake',
      icon: TrendingUp,
      count: orders.length,
      exportFn: () => exportOrdersToCSV(orders)
    },
    {
      id: 'inventory',
      name: 'Warehouse Inventory Audit',
      description: 'Current on-hand snack stock, threshold alerts and restocking urgency',
      icon: Boxes,
      count: products.length,
      exportFn: () => exportInventoryToCSV(products)
    },
    {
      id: 'customers',
      name: 'Customer Lifetime Ledger',
      description: 'Buyer accounts, cumulative order count, and total gross spend',
      icon: Users,
      count: customers.length,
      exportFn: () => exportCustomersToCSV(customers)
    }
  ];

  const currentCategory = reportCategories.find((c) => c.id === activeReport);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Business Reporting & Data Exports
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Download certified CSV reports for accountant audits, inventory reconciliation, and operations
          </p>
        </div>
      </div>

      {/* Report Cards Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {reportCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeReport === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveReport(cat.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-white border-maroon shadow-md ring-1 ring-maroon/20'
                  : 'bg-white/70 border-[#E8DDCB] hover:bg-white hover:border-gold'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isActive
                        ? 'bg-maroon text-white'
                        : 'bg-cream text-maroon'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-muted bg-warmwhite px-2 py-0.5 rounded border border-[#E8DDCB]">
                    {cat.count} Rows
                  </span>
                </div>
                <h3 className="font-serif font-bold text-sm text-darktext">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-muted mt-1 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#E8DDCB]/60 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-maroon">
                  {isActive ? 'Selected' : 'Select'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cat.exportFn();
                  }}
                  className="p-1 rounded hover:bg-gold/15 text-muted hover:text-darktext transition-colors"
                  title="Export immediately to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview Container */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E8DDCB]">
          <div>
            <h3 className="font-serif font-bold text-base text-darktext">
              {currentCategory?.name}
            </h3>
            <p className="text-xs text-muted">
              Live preview of dataset before generating certified export file
            </p>
          </div>
          <button
            onClick={currentCategory?.exportFn}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Formatted CSV</span>
          </button>
        </div>

        {/* Dynamic Table Preview */}
        <div className="overflow-x-auto border border-[#E8DDCB] rounded-lg">
          {activeReport === 'sales' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                <tr>
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3 text-right">Subtotal</th>
                  <th className="py-2.5 px-3 text-right">Tax</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                  <th className="py-2.5 px-3 text-center">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDCB]/50">
                {orders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 px-3 font-mono font-bold text-darktext">
                      {o.id}
                    </td>
                    <td className="py-2.5 px-3">{o.customerName}</td>
                    <td className="py-2.5 px-3 text-muted">
                      {formatDate(o.createdAt)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      {formatCurrency(o.subtotal || o.total - 40)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-muted">
                      {formatCurrency(o.tax || Math.round(o.total * 0.05))}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-maroon">
                      {formatCurrency(o.total)}
                    </td>
                    <td className="py-2.5 px-3 text-center capitalize">
                      {o.paymentStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'inventory' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                <tr>
                  <th className="py-2.5 px-3">SKU ID</th>
                  <th className="py-2.5 px-3">Snack Product</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3 text-center">Stock</th>
                  <th className="py-2.5 px-3 text-center">Threshold</th>
                  <th className="py-2.5 px-3 text-right">Unit Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDCB]/50">
                {products.slice(0, 6).map((p) => (
                  <tr key={p.id}>
                    <td className="py-2.5 px-3 font-mono text-muted">{p.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-darktext">
                      {p.name}
                    </td>
                    <td className="py-2.5 px-3 capitalize">{p.category}</td>
                    <td className="py-2.5 px-3 text-center font-bold text-darktext">
                      {p.stock}
                    </td>
                    <td className="py-2.5 px-3 text-center text-muted">
                      {p.lowStockThreshold}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-maroon">
                      {formatCurrency(p.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeReport === 'customers' && (
            <table className="w-full text-left text-xs">
              <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                <tr>
                  <th className="py-2.5 px-3">Customer ID</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3 text-center">Orders</th>
                  <th className="py-2.5 px-3 text-right">Total Spent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDCB]/50">
                {customers.slice(0, 6).map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 px-3 font-mono text-muted">{c.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-darktext">
                      {c.name}
                    </td>
                    <td className="py-2.5 px-3 text-muted">{c.phone || c.email}</td>
                    <td className="py-2.5 px-3 text-center font-bold">
                      {c.totalOrders}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-maroon">
                      {formatCurrency(c.totalSpent)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
