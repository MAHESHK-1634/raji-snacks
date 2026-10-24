import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Store,
  Building2,
  Sliders,
  Palette,
  Database,
  RotateCcw,
  Download,
  Save,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export default function Settings() {
  const { settings, updateSettings, resetDemoData, products, orders, customers } =
    useAdmin();

  const [activeTab, setActiveTab] = useState('store'); // 'store' | 'business' | 'orders' | 'appearance' | 'data'
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local form state cloned from settings context
  const [formData, setFormData] = useState({
    storeName: settings?.storeName || 'RAJI SNACKS',
    storeTagline: settings?.storeTagline || 'Authentic Traditional South Indian Savouries',
    supportEmail: settings?.supportEmail || 'care@rajisnacks.com',
    supportPhone: settings?.supportPhone || '+91 98401 23456',
    businessName: settings?.businessName || 'Raji Traditional Foods Pvt Ltd',
    gstin: settings?.gstin || '33AAAAA0000A1Z5',
    invoicePrefix: settings?.invoicePrefix || 'INV-2026-',
    registeredAddress:
      settings?.registeredAddress ||
      '45/2, South Veli Street, Madurai, Tamil Nadu - 625001',
    defaultLowStock: settings?.defaultLowStock || 15,
    standardShippingFee: settings?.standardShippingFee || 40,
    freeShippingThreshold: settings?.freeShippingThreshold || 499
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export full JSON snapshot
  const handleExportJson = () => {
    const snapshot = {
      exportedAt: new Date().toISOString(),
      store: formData.storeName,
      productsCount: products.length,
      ordersCount: orders.length,
      customersCount: customers.length,
      products,
      orders,
      customers
    };
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raji_snacks_demo_snapshot_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'store', label: 'Store Profile', icon: Store },
    { id: 'business', label: 'Business & GST', icon: Building2 },
    { id: 'orders', label: 'Order Rules', icon: Sliders },
    { id: 'appearance', label: 'Theme Tokens', icon: Palette },
    { id: 'data', label: 'Data & Maintenance', icon: Database }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Admin Configuration & Settings
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Manage store identity, invoice tax configurations, delivery thresholds and demo data snapshots
          </p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest/15 text-forest text-xs font-semibold animate-in fade-in-50">
            <CheckCircle2 className="w-4 h-4" />
            <span>Preferences Saved Successfully</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin border-b border-[#E8DDCB]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all relative whitespace-nowrap ${
                isActive
                  ? 'text-maroon border-b-2 border-maroon'
                  : 'text-muted hover:text-darktext'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Store Profile */}
        {activeTab === 'store' && (
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-darktext border-b border-[#E8DDCB]/60 pb-2">
              Store Identity & Contact Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Store Display Name
                </label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Brand Tagline
                </label>
                <input
                  type="text"
                  name="storeTagline"
                  value={formData.storeTagline}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Customer Care Email
                </label>
                <input
                  type="email"
                  name="supportEmail"
                  value={formData.supportEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Customer Care Helpline
                </label>
                <input
                  type="text"
                  name="supportPhone"
                  value={formData.supportPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Business & GST Details */}
        {activeTab === 'business' && (
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-darktext border-b border-[#E8DDCB]/60 pb-2">
              Legal Business Entity & Taxation Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Registered Legal Company Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  GSTIN / Tax Identification
                </label>
                <input
                  type="text"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs font-mono uppercase focus:outline-none focus:border-gold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Registered Kitchen & Dispatch Address
                </label>
                <textarea
                  rows="2"
                  name="registeredAddress"
                  value={formData.registeredAddress}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Order & Inventory Rules */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-darktext border-b border-[#E8DDCB]/60 pb-2">
              Warehouse Stock Thresholds & Shipping Fees
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Default Low Stock Alert Threshold
                </label>
                <input
                  type="number"
                  name="defaultLowStock"
                  value={formData.defaultLowStock}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
                <span className="text-[10px] text-muted block mt-1">
                  Triggers dashboard restock alerts when below this quantity.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Standard Courier Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  name="standardShippingFee"
                  value={formData.standardShippingFee}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-darktext mb-1">
                  Free Shipping Threshold (₹)
                </label>
                <input
                  type="number"
                  name="freeShippingThreshold"
                  value={formData.freeShippingThreshold}
                  onChange={handleChange}
                  className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
                <span className="text-[10px] text-muted block mt-1">
                  Orders exceeding this value receive complimentary courier dispatch.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Theme Tokens & Visual System */}
        {activeTab === 'appearance' && (
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-darktext border-b border-[#E8DDCB]/60 pb-2">
              Premium Golden Harvest Brand Tokens
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-[#E8DDCB] bg-[#6D281B] text-white">
                <span className="font-bold block">Deep Maroon</span>
                <span className="text-[10px] font-mono opacity-80">#6D281B</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E8DDCB] bg-[#E9A52B] text-darktext">
                <span className="font-bold block">Harvest Gold</span>
                <span className="text-[10px] font-mono opacity-80">#E9A52B</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E8DDCB] bg-[#344B32] text-white">
                <span className="font-bold block">Forest Green</span>
                <span className="text-[10px] font-mono opacity-80">#344B32</span>
              </div>
              <div className="p-3 rounded-lg border border-[#E8DDCB] bg-[#F8F0DF] text-darktext">
                <span className="font-bold block">Warm Cream</span>
                <span className="text-[10px] font-mono opacity-80">#F8F0DF</span>
              </div>
            </div>

            <p className="text-xs text-muted">
              The admin control centre shares identical color palette variables and typography with the customer-facing storefront to maintain absolute brand cohesiveness.
            </p>
          </div>
        )}

        {/* Tab 5: Data Settings & Reset */}
        {activeTab === 'data' && (
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-5">
            <h3 className="font-serif font-bold text-sm text-darktext border-b border-[#E8DDCB]/60 pb-2">
              Demo Data Lifecycle & State Persistence
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-warmwhite border border-[#E8DDCB] space-y-2">
                <h4 className="text-xs font-bold text-darktext flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-maroon" />
                  <span>Download Local JSON Snapshot</span>
                </h4>
                <p className="text-xs text-muted">
                  Export the current local state including customized products, orders, invoices and logs as a JSON backup file.
                </p>
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E8DDCB] text-xs font-semibold text-darktext hover:bg-cream transition-colors shadow-xs"
                >
                  Export Data Snapshot
                </button>
              </div>

              <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-2">
                <h4 className="text-xs font-bold text-red-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Reset All Records to Factory Default</span>
                </h4>
                <p className="text-xs text-red-700">
                  Erase local changes in localStorage and restore all initial mock products, categories, orders and activity logs.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm(
                        'WARNING: Reset all demonstration records to pristine defaults? Any newly added products or edited stock levels will revert.'
                      )
                    ) {
                      resetDemoData();
                    }
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors shadow-xs"
                >
                  Confirm Reset Demo Data
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Bar */}
        {activeTab !== 'appearance' && activeTab !== 'data' && (
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8DDCB]">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-all shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
