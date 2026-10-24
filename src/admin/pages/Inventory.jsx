import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Boxes,
  Search,
  Filter,
  Download,
  Plus,
  Minus,
  Edit3,
  History,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';
import AdminModal from '../components/common/AdminModal';
import { formatDate, formatTimeAgo } from '../utils/formatters';
import { exportInventoryToCSV } from '../utils/exportCsv';

export default function Inventory() {
  const [searchParams] = useSearchParams();
  const { products, inventoryLogs, adjustStock } = useAdmin();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('stocks'); // 'stocks' | 'history'

  // Adjustment Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adjustmentType, setAdjustmentType] = useState('increase'); // 'increase' | 'decrease' | 'set'
  const [adjustmentAmount, setAdjustmentAmount] = useState(10);
  const [adjustmentReason, setAdjustmentReason] = useState(
    'Fresh Kitchen Batch Produced'
  );
  const [adjustError, setAdjustError] = useState('');

  const commonReasons = [
    'Fresh Kitchen Batch Produced',
    'Customer Return Restock',
    'Damaged / Broken in Transit',
    'Internal Quality Audit',
    'Promotional Sampling',
    'Seasonal Buffer Stocking'
  ];

  const handleOpenAdjust = (product) => {
    setSelectedProduct(product);
    setAdjustmentType('increase');
    setAdjustmentAmount(10);
    setAdjustmentReason('Fresh Kitchen Batch Produced');
    setAdjustError('');
  };

  const handleApplyAdjustment = (e) => {
    e.preventDefault();
    if (!selectedProduct) return;

    const amount = Number(adjustmentAmount);
    if (isNaN(amount) || amount <= 0) {
      setAdjustError('Please enter a valid positive number');
      return;
    }

    let delta = 0;
    if (adjustmentType === 'increase') {
      delta = amount;
    } else if (adjustmentType === 'decrease') {
      if (selectedProduct.stock - amount < 0) {
        setAdjustError(`Cannot decrease below 0. Maximum reduction is ${selectedProduct.stock}.`);
        return;
      }
      delta = -amount;
    } else if (adjustmentType === 'set') {
      delta = amount - selectedProduct.stock;
    }

    adjustStock(selectedProduct.id, delta, adjustmentReason);
    setSelectedProduct(null);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    const isLow = p.stock <= (p.lowStockThreshold || 15) && p.stock > 0;
    const isOut = p.stock === 0;

    let matchesStatus = true;
    if (statusFilter === 'in-stock') matchesStatus = p.stock > (p.lowStockThreshold || 15);
    if (statusFilter === 'low-stock') matchesStatus = isLow;
    if (statusFilter === 'out-of-stock') matchesStatus = isOut;

    return matchesSearch && matchesStatus;
  });

  // Low stock and out of stock counts
  const lowCount = products.filter(
    (p) => p.stock <= (p.lowStockThreshold || 15) && p.stock > 0
  ).length;
  const outCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Monitor real-time warehouse stocks, thresholds, audit trails and batch restocks
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportInventoryToCSV(products)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-darktext text-xs font-semibold hover:border-gold hover:bg-white transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-muted" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Stock Health KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E8DDCB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted font-medium">Total Tracked SKUs</span>
            <p className="text-xl font-bold text-darktext mt-0.5">{products.length} Products</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DDCB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-amber-700 font-medium">Low Stock Warning</span>
            <p className="text-xl font-bold text-amber-600 mt-0.5">{lowCount} Products</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DDCB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-red-700 font-medium">Out of Stock</span>
            <p className="text-xl font-bold text-red-600 mt-0.5">{outCount} Products</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
            <Boxes className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* View Tabs: Current Stock vs. Adjustment History */}
      <div className="flex items-center justify-between border-b border-[#E8DDCB]">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('stocks')}
            className={`pb-3 text-xs font-bold transition-all relative ${
              activeTab === 'stocks'
                ? 'text-maroon border-b-2 border-maroon'
                : 'text-muted hover:text-darktext'
            }`}
          >
            Current Stock Levels ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'text-maroon border-b-2 border-maroon'
                : 'text-muted hover:text-darktext'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Adjustment Audit Log ({inventoryLogs?.length || 0})</span>
          </button>
        </div>
      </div>

      {activeTab === 'stocks' ? (
        <>
          {/* Filters Bar */}
          <div className="bg-white rounded-xl p-3.5 border border-[#E8DDCB] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
              <input
                type="text"
                placeholder="Search snack by name, ID or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
              >
                <option value="all">All Stock Statuses</option>
                <option value="in-stock">In Stock (&gt;15)</option>
                <option value="low-stock">Low Stock (≤15)</option>
                <option value="out-of-stock">Out of Stock (0)</option>
              </select>
            </div>
          </div>

          {/* Current Stock Table */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                  <tr>
                    <th className="py-3 px-4">Snack Item</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3 text-center">Current Stock</th>
                    <th className="py-3 px-3 text-center">Alert Threshold</th>
                    <th className="py-3 px-3 text-center">Status</th>
                    <th className="py-3 px-3 text-right">Last Updated</th>
                    <th className="py-3 px-4 text-right">Quick Stock Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDCB]/50">
                  {filteredProducts.map((p) => {
                    const isLow =
                      p.stock <= (p.lowStockThreshold || 15) && p.stock > 0;
                    const isOut = p.stock === 0;

                    return (
                      <tr
                        key={p.id}
                        className="hover:bg-cream/20 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-9 h-9 rounded-lg object-cover border border-[#E8DDCB] flex-shrink-0"
                              onError={(e) => {
                                e.target.src = '/images/hero_snack_spread.jpg';
                              }}
                            />
                            <div>
                              <p className="font-semibold text-darktext">{p.name}</p>
                              <p className="text-[10px] text-muted font-mono">{p.id}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="capitalize text-muted font-medium">
                            {p.category}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span
                            className={`font-bold text-sm ${
                              isOut
                                ? 'text-red-600'
                                : isLow
                                ? 'text-amber-600'
                                : 'text-forest'
                            }`}
                          >
                            {p.stock}
                          </span>
                          <span className="text-[10px] text-muted block">packs</span>
                        </td>

                        <td className="py-3 px-3 text-center text-muted font-mono">
                          {p.lowStockThreshold || 15}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <StatusBadge
                            status={
                              isOut
                                ? 'out-of-stock'
                                : isLow
                                ? 'low-stock'
                                : 'in-stock'
                            }
                          />
                        </td>

                        <td className="py-3 px-3 text-right text-muted text-[11px]">
                          {p.updatedAt ? formatTimeAgo(p.updatedAt) : 'Recently'}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleOpenAdjust(p)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-gold/20 text-maroon text-xs font-semibold border border-[#E8DDCB] transition-colors"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Adjust Stock</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Adjustment Audit History Table */
        <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
          <div className="p-4 bg-warmwhite border-b border-[#E8DDCB] flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-darktext">
              Stock Movement & Audit Log
            </h3>
            <span className="text-xs text-muted">
              Showing recent stock entries
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                <tr>
                  <th className="py-3 px-4">Audit ID</th>
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Snack Product</th>
                  <th className="py-3 px-3 text-center">Prev Qty</th>
                  <th className="py-3 px-3 text-center">Change</th>
                  <th className="py-3 px-3 text-center">New Qty</th>
                  <th className="py-3 px-4">Reason / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DDCB]/50">
                {(inventoryLogs || []).map((log) => {
                  const isPositive = log.changeAmount > 0;
                  return (
                    <tr key={log.id} className="hover:bg-cream/20 transition-colors">
                      <td className="py-3 px-4 font-mono text-[11px] text-muted">
                        {log.id}
                      </td>
                      <td className="py-3 px-3 text-muted">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="py-3 px-3 font-semibold text-darktext">
                        {log.productName}
                      </td>
                      <td className="py-3 px-3 text-center text-muted font-mono">
                        {log.previousQty}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-flex items-center gap-0.5 font-bold ${
                            isPositive ? 'text-forest' : 'text-red-600'
                          }`}
                        >
                          {isPositive ? (
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5" />
                          )}
                          {isPositive ? `+${log.changeAmount}` : log.changeAmount}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-darktext font-mono">
                        {log.newQty}
                      </td>
                      <td className="py-3 px-4 text-muted">{log.reason}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      <AdminModal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        title={`Adjust Stock: ${selectedProduct?.name}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleApplyAdjustment} className="space-y-4">
          <div className="p-3 rounded-lg bg-warmwhite border border-[#E8DDCB] flex items-center justify-between">
            <span className="text-xs text-muted">Current Stock on Hand:</span>
            <span className="text-base font-bold text-darktext">
              {selectedProduct?.stock} packs
            </span>
          </div>

          {/* Action Type Toggle */}
          <div>
            <label className="block text-xs font-semibold text-darktext mb-1.5">
              Adjustment Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAdjustmentType('increase')}
                className={`py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  adjustmentType === 'increase'
                    ? 'bg-forest text-white border-forest shadow-xs'
                    : 'bg-white border-[#E8DDCB] text-darktext hover:bg-cream'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Restock (+)</span>
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentType('decrease')}
                className={`py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  adjustmentType === 'decrease'
                    ? 'bg-red-600 text-white border-red-600 shadow-xs'
                    : 'bg-white border-[#E8DDCB] text-darktext hover:bg-cream'
                }`}
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Reduce (-)</span>
              </button>
              <button
                type="button"
                onClick={() => setAdjustmentType('set')}
                className={`py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  adjustmentType === 'set'
                    ? 'bg-darktext text-white border-darktext shadow-xs'
                    : 'bg-white border-[#E8DDCB] text-darktext hover:bg-cream'
                }`}
              >
                <span>Exact Count</span>
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              {adjustmentType === 'set'
                ? 'New Absolute Count (Packs) *'
                : 'Quantity to Change (Packs) *'}
            </label>
            <input
              type="number"
              min="0"
              value={adjustmentAmount}
              onChange={(e) => {
                setAdjustmentAmount(e.target.value);
                setAdjustError('');
              }}
              className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs font-bold text-darktext focus:outline-none focus:border-gold"
            />
            {adjustError && (
              <p className="text-[10px] text-red-600 mt-1 font-medium">{adjustError}</p>
            )}
          </div>

          {/* Reason Selection */}
          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              Reason / Justification *
            </label>
            <select
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold mb-2"
            >
              {commonReasons.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or enter custom reason / notes..."
              value={adjustmentReason}
              onChange={(e) => setAdjustmentReason(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DDCB]">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="px-4 py-2 rounded-lg border border-[#E8DDCB] text-xs font-semibold text-darktext hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark shadow-xs"
            >
              Commit Adjustment
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
