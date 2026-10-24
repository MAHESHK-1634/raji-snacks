import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ShoppingCart,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  FileText,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';
import { exportOrdersToCSV } from '../utils/exportCsv';

export default function Orders() {
  const [searchParams] = useSearchParams();
  const { orders, updateOrderStatus, updatePaymentStatus } = useAdmin();

  // Filters state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter and Sort logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Search
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.customerPhone && order.customerPhone.includes(searchQuery));

      // Order Status
      const matchesStatus =
        statusFilter === 'all' || order.orderStatus === statusFilter;

      // Payment Status
      const matchesPayment =
        paymentFilter === 'all' || order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    }).sort((a, b) => {
      if (sortBy === 'newest')
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'oldest')
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'total-high') return b.total - a.total;
      if (sortBy === 'total-low') return a.total - b.total;
      return 0;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Status counts for pills
  const statusCounts = orders.reduce((acc, o) => {
    acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
    return acc;
  }, {});

  const orderStatuses = [
    'pending',
    'confirmed',
    'processing',
    'packed',
    'shipped',
    'delivered',
    'cancelled'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Online Order Management
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Process snack dispatches, verify payments, track courier status and print invoices
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => exportOrdersToCSV(filteredOrders)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-darktext text-xs font-semibold hover:border-gold hover:bg-white transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-muted" />
            <span>Export Orders CSV</span>
          </button>
        </div>
      </div>

      {/* Quick Status Pill Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        <button
          onClick={() => {
            setStatusFilter('all');
            setCurrentPage(1);
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
            statusFilter === 'all'
              ? 'bg-maroon text-white border-maroon shadow-xs'
              : 'bg-white text-muted border-[#E8DDCB] hover:text-darktext'
          }`}
        >
          All Orders ({orders.length})
        </button>
        {orderStatuses.map((st) => (
          <button
            key={st}
            onClick={() => {
              setStatusFilter(st);
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap capitalize transition-all border ${
              statusFilter === st
                ? 'bg-maroon text-white border-maroon shadow-xs'
                : 'bg-white text-muted border-[#E8DDCB] hover:text-darktext'
            }`}
          >
            {st} ({statusCounts[st] || 0})
          </button>
        ))}
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl p-3.5 border border-[#E8DDCB] shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
          <input
            type="text"
            placeholder="Search by order ID (e.g. RS-ORD-101), customer, phone..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
          />
        </div>

        {/* Payment Filter */}
        <div>
          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold capitalize"
          >
            <option value="all">All Payment Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        {/* Sorting */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-1.5 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="total-high">Total: High to Low</option>
            <option value="total-low">Total: Low to High</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
              <tr>
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-3">Customer Details</th>
                <th className="py-3 px-3">Items & Snacks</th>
                <th className="py-3 px-3 text-right">Order Total</th>
                <th className="py-3 px-3 text-center">Payment Status</th>
                <th className="py-3 px-3 text-center">Order Workflow</th>
                <th className="py-3 px-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCB]/50">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-muted">
                    <ShoppingCart className="w-10 h-10 mx-auto text-muted/40 mb-2" />
                    <p className="font-semibold text-sm text-darktext">
                      No matching orders found
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Adjust your filters or search term to see orders.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => {
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-cream/20 transition-colors"
                    >
                      {/* ID and Date */}
                      <td className="py-3 px-4">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="font-bold text-darktext hover:text-maroon hover:underline block"
                        >
                          {order.id}
                        </Link>
                        <span className="text-[10px] text-muted block">
                          {formatDate(order.createdAt)}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-3 px-3">
                        <p className="font-semibold text-darktext">
                          {order.customerName}
                        </p>
                        <p className="text-[10px] text-muted">
                          {order.customerPhone || order.customerEmail || 'Direct checkout'}
                        </p>
                      </td>

                      {/* Items */}
                      <td className="py-3 px-3">
                        <p className="text-darktext font-medium">
                          {order.items?.length || 1} distinct snacks
                        </p>
                        <p className="text-[10px] text-muted truncate max-w-[150px]">
                          {order.items?.map((it) => it.name).join(', ')}
                        </p>
                      </td>

                      {/* Total & Payment method */}
                      <td className="py-3 px-3 text-right">
                        <span className="font-bold text-maroon text-sm">
                          {formatCurrency(order.total)}
                        </span>
                        <span className="text-[10px] text-muted block uppercase">
                          {order.paymentMethod || 'UPI / Card'}
                        </span>
                      </td>

                      {/* Payment Status */}
                      <td className="py-3 px-3 text-center">
                        <StatusBadge status={order.paymentStatus} />
                      </td>

                      {/* Order Status with Quick Transition Dropdown */}
                      <td className="py-3 px-3 text-center">
                        <select
                          value={order.orderStatus}
                          onChange={(e) =>
                            updateOrderStatus(order.id, e.target.value)
                          }
                          className="text-[11px] font-semibold px-2 py-1 rounded border border-[#E8DDCB] bg-warmwhite text-darktext focus:outline-none focus:border-gold capitalize cursor-pointer"
                        >
                          {orderStatuses.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cream hover:bg-gold/20 text-maroon text-xs font-semibold border border-[#E8DDCB] transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View Details</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-3 border-t border-[#E8DDCB] bg-warmwhite/50 text-xs">
            <span className="text-muted">
              Showing page {currentPage} of {totalPages} ({filteredOrders.length} total)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-2.5 py-1 rounded border border-[#E8DDCB] bg-white disabled:opacity-40 hover:bg-cream"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-2.5 py-1 rounded border border-[#E8DDCB] bg-white disabled:opacity-40 hover:bg-cream"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
