import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  IndianRupee,
  MessageSquare,
  ArrowUpDown,
  CheckCircle2,
  Edit2
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';
import AdminModal from '../components/common/AdminModal';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportCustomersToCSV } from '../utils/exportCsv';

export default function Customers() {
  const { customers, orders } = useAdmin();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('spent-high');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerNote, setCustomerNote] = useState('');
  const [internalNotesMap, setInternalNotesMap] = useState({});

  // Dynamic calculations for each customer based on actual orders
  const customerAnalytics = useMemo(() => {
    return customers.map((c) => {
      const userOrders = orders.filter(
        (o) =>
          o.customerId === c.id ||
          o.customerName?.toLowerCase() === c.name.toLowerCase() ||
          o.customerEmail?.toLowerCase() === c.email.toLowerCase()
      );

      const totalOrders = userOrders.length || c.totalOrders || 0;
      const totalSpent = userOrders.reduce((sum, o) => sum + (o.total || 0), 0) || c.totalSpent || 0;
      const aov = totalOrders > 0 ? Math.round(totalSpent / totalOrders) : 0;
      const lastOrder = userOrders[0]?.createdAt || c.lastOrderDate || '2026-10-15';

      return {
        ...c,
        totalOrders,
        totalSpent,
        aov,
        lastOrder,
        userOrders
      };
    });
  }, [customers, orders]);

  // Filtered & Sorted Customers
  const filteredCustomers = useMemo(() => {
    return customerAnalytics.filter((c) => {
      return (
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.phone && c.phone.includes(searchQuery)) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }).sort((a, b) => {
      if (sortBy === 'spent-high') return b.totalSpent - a.totalSpent;
      if (sortBy === 'spent-low') return a.totalSpent - b.totalSpent;
      if (sortBy === 'orders-high') return b.totalOrders - a.totalOrders;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [customerAnalytics, searchQuery, sortBy]);

  // Handle Note Submission
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!customerNote.trim() || !selectedCustomer) return;

    setInternalNotesMap((prev) => ({
      ...prev,
      [selectedCustomer.id]: [
        ...(prev[selectedCustomer.id] || []),
        { text: customerNote.trim(), time: new Date().toISOString() }
      ]
    }));
    setCustomerNote('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Customer Directory & Profiles
          </h1>
          <p className="text-xs text-muted mt-0.5">
            View verified client snack orders, purchase history, lifetime value and contact details
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportCustomersToCSV(filteredCustomers)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-darktext text-xs font-semibold hover:border-gold hover:bg-white transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-muted" />
            <span>Export Customers CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-[#E8DDCB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted font-medium">Registered Clients</span>
            <p className="text-xl font-bold text-darktext mt-0.5">
              {customers.length} Customers
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-maroon/10 flex items-center justify-center text-maroon">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DDCB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted font-medium">Total Lifetime Spend</span>
            <p className="text-xl font-bold text-forest mt-0.5">
              {formatCurrency(
                customerAnalytics.reduce((sum, c) => sum + c.totalSpent, 0)
              )}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
            <IndianRupee className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#E8DDCB] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted font-medium">Average Order Value</span>
            <p className="text-xl font-bold text-maroon mt-0.5">
              {formatCurrency(
                Math.round(
                  customerAnalytics.reduce((sum, c) => sum + c.totalSpent, 0) /
                    (orders.length || 1)
                )
              )}
            </p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center text-maroon">
            <ShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-3.5 border border-[#E8DDCB] shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
          <input
            type="text"
            placeholder="Search by name, email, phone or customer ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
          >
            <option value="spent-high">Spend: Highest First</option>
            <option value="spent-low">Spend: Lowest First</option>
            <option value="orders-high">Orders: Most Active</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
              <tr>
                <th className="py-3 px-4">Customer Name & ID</th>
                <th className="py-3 px-3">Contact Details</th>
                <th className="py-3 px-3 text-center">Total Orders</th>
                <th className="py-3 px-3 text-right">Lifetime Spend</th>
                <th className="py-3 px-3 text-center">Average Order</th>
                <th className="py-3 px-3 text-right">Latest Order</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCB]/50">
              {filteredCustomers.map((cust) => {
                return (
                  <tr
                    key={cust.id}
                    className="hover:bg-cream/20 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/30 to-maroon/20 flex items-center justify-center font-bold text-xs text-maroon border border-[#E8DDCB]">
                          {cust.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-darktext">{cust.name}</p>
                          <span className="text-[10px] text-muted font-mono">
                            {cust.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <p className="text-darktext">{cust.email}</p>
                      <p className="text-[10px] text-muted font-mono">{cust.phone}</p>
                    </td>

                    <td className="py-3 px-3 text-center font-bold text-darktext font-mono">
                      {cust.totalOrders} orders
                    </td>

                    <td className="py-3 px-3 text-right font-bold text-maroon font-mono">
                      {formatCurrency(cust.totalSpent)}
                    </td>

                    <td className="py-3 px-3 text-center text-muted font-mono">
                      {formatCurrency(cust.aov)}
                    </td>

                    <td className="py-3 px-3 text-right text-muted text-[11px]">
                      {formatDate(cust.lastOrder)}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCustomer(cust)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-gold/20 text-maroon text-xs font-semibold border border-[#E8DDCB] transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View Profile</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <AdminModal
          isOpen={Boolean(selectedCustomer)}
          onClose={() => setSelectedCustomer(null)}
          title={`Customer: ${selectedCustomer.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            {/* Customer Header Strip */}
            <div className="p-4 rounded-xl bg-warmwhite border border-[#E8DDCB] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-maroon text-white flex items-center justify-center text-lg font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-darktext">
                    {selectedCustomer.name}
                  </h3>
                  <p className="text-xs text-muted">
                    Client ID: {selectedCustomer.id} • Registered:{' '}
                    {formatDate(selectedCustomer.registeredAt || '2026-08-10')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase text-muted font-bold block">
                  Lifetime Value
                </span>
                <span className="text-base font-bold text-maroon">
                  {formatCurrency(selectedCustomer.totalSpent)}
                </span>
              </div>
            </div>

            {/* Contact & Shipping Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-lg border border-[#E8DDCB] bg-white space-y-2">
                <span className="font-bold text-darktext block text-[11px] uppercase tracking-wider text-muted">
                  Contact Information
                </span>
                <p className="flex items-center gap-2 text-darktext">
                  <Mail className="w-3.5 h-3.5 text-muted" />
                  <span>{selectedCustomer.email}</span>
                </p>
                <p className="flex items-center gap-2 text-darktext">
                  <Phone className="w-3.5 h-3.5 text-muted" />
                  <span>{selectedCustomer.phone}</span>
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-[#E8DDCB] bg-white space-y-2">
                <span className="font-bold text-darktext block text-[11px] uppercase tracking-wider text-muted">
                  Delivery Address
                </span>
                <p className="flex items-start gap-2 text-darktext leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-muted mt-0.5 flex-shrink-0" />
                  <span>
                    {selectedCustomer.address ||
                      '12, South Masi Street, Madurai, Tamil Nadu 625001'}
                  </span>
                </p>
              </div>
            </div>

            {/* Order History Table */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-darktext mb-2">
                Recent Purchase Orders ({selectedCustomer.userOrders?.length || 0})
              </h4>
              <div className="border border-[#E8DDCB] rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                    <tr>
                      <th className="py-2 px-3">Order ID</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                      <th className="py-2 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DDCB]/50">
                    {selectedCustomer.userOrders &&
                    selectedCustomer.userOrders.length > 0 ? (
                      selectedCustomer.userOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-cream/20">
                          <td className="py-2 px-3 font-semibold text-darktext">
                            {ord.id}
                          </td>
                          <td className="py-2 px-3 text-muted">
                            {formatDate(ord.createdAt)}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-maroon font-mono">
                            {formatCurrency(ord.total)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            <StatusBadge status={ord.orderStatus} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-4 text-center text-muted">
                          No recent orders recorded for this customer account.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Internal Staff Notes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-darktext flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-maroon" />
                <span>Customer Preferences & Internal Staff Notes</span>
              </h4>

              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {(internalNotesMap[selectedCustomer.id] || []).map((n, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-warmwhite border border-[#E8DDCB] text-xs text-darktext"
                  >
                    <p>{n.text}</p>
                    <span className="text-[10px] text-muted block mt-0.5">
                      {formatDate(n.time)}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="e.g. Prefers extra crispy garlic murukku, calls for wedding festival orders..."
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark shadow-xs"
                >
                  Save Note
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2 border-t border-[#E8DDCB]">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 rounded-lg bg-darktext text-white text-xs font-semibold hover:bg-black"
              >
                Close Profile
              </button>
            </div>
          </div>
        </AdminModal>
      )}
    </div>
  );
}
