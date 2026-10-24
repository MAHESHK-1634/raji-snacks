import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  XCircle,
  Truck,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  MessageSquare,
  Package
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';
import OrderTimeline from '../components/orders/OrderTimeline';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const {
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    addOrderNote,
    cancelOrder
  } = useAdmin();

  // Find order
  const order = orders.find((o) => o.id === orderId);

  // Local UI State for staff note
  const [newNote, setNewNote] = useState('');

  if (!order) {
    return (
      <div className="bg-white rounded-xl border border-[#E8DDCB] p-12 text-center max-w-lg mx-auto">
        <Package className="w-12 h-12 text-muted/40 mx-auto mb-3" />
        <h2 className="text-base font-bold text-darktext">Order Not Found</h2>
        <p className="text-xs text-muted mt-1">
          The requested order ID "{orderId}" does not exist in the management records.
        </p>
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Orders</span>
        </Link>
      </div>
    );
  }

  // Add internal note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addOrderNote(order.id, newNote.trim());
    setNewNote('');
  };

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
      {/* Header & Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 rounded-lg hover:bg-cream border border-[#E8DDCB] text-muted hover:text-darktext transition-colors"
            title="Back to Orders List"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif font-bold text-darktext">
                Order {order.id}
              </h1>
              <StatusBadge status={order.orderStatus} />
              <StatusBadge status={order.paymentStatus} />
            </div>
            <p className="text-xs text-muted mt-0.5">
              Placed on {formatDate(order.createdAt)} •{' '}
              {order.paymentMethod || 'Online'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {order.orderStatus !== 'cancelled' && (
            <button
              onClick={() => {
                if (
                  window.confirm(
                    'Are you sure you want to cancel this order? Stock will be restored to warehouse inventory.'
                  )
                ) {
                  cancelOrder(order.id, 'Cancelled by store administrator');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition-colors shadow-xs"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Order</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Order Fulfillment Timeline */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-darktext">
            Fulfillment Progression
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted font-medium">Update Stage:</span>
            <select
              value={order.orderStatus}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#E8DDCB] bg-warmwhite text-darktext focus:outline-none focus:border-gold capitalize cursor-pointer"
            >
              {orderStatuses.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        <OrderTimeline
          currentStatus={order.orderStatus}
          statusHistory={order.statusHistory || []}
        />
      </div>

      {/* Main Grid: Order Details & Customer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Items & Financial Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items Table */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
            <div className="p-4 bg-warmwhite border-b border-[#E8DDCB] flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-darktext">
                Ordered Snack Items ({order.items?.length || 0})
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-warmwhite/60 text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
                  <tr>
                    <th className="py-2.5 px-4">Snack Product</th>
                    <th className="py-2.5 px-3">Pack Size</th>
                    <th className="py-2.5 px-3 text-center">Quantity</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-4 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDCB]/50">
                  {order.items?.map((item, idx) => {
                    const lineSubtotal = (item.price || 0) * (item.quantity || 1);
                    return (
                      <tr key={idx} className="hover:bg-cream/20">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-9 h-9 rounded object-cover border border-[#E8DDCB] flex-shrink-0"
                              onError={(e) => {
                                e.target.src = '/images/hero_snack_spread.jpg';
                              }}
                            />
                            <span className="font-semibold text-darktext">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-muted font-mono bg-warmwhite px-1.5 py-0.5 rounded border border-[#E8DDCB]">
                            {item.size || 'Standard'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-darktext font-mono">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-3 text-right text-muted font-mono">
                          {formatCurrency(item.price)}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-maroon font-mono">
                          {formatCurrency(lineSubtotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-warmwhite/40 border-t border-[#E8DDCB] space-y-1.5 text-xs">
              <div className="flex justify-between text-muted">
                <span>Items Subtotal:</span>
                <span className="font-mono text-darktext">
                  {formatCurrency(order.subtotal || order.total - 40)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-forest font-medium">
                  <span>Promotional Discount:</span>
                  <span className="font-mono">
                    -{formatCurrency(order.discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Standard Delivery Shipping:</span>
                <span className="font-mono text-darktext">
                  {order.shippingFee === 0 ? 'FREE' : formatCurrency(order.shippingFee || 40)}
                </span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Estimated GST Tax (5% included):</span>
                <span className="font-mono text-darktext">
                  {formatCurrency(order.tax || Math.round(order.total * 0.05))}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-maroon pt-2 border-t border-[#E8DDCB]">
                <span>Grand Total:</span>
                <span className="font-mono">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Internal Staff Notes & Dispatch Remarks */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-darktext flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-maroon" />
              <span>Internal Staff Notes & Dispatch Log</span>
            </h3>

            {/* Existing Notes List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {order.notes && order.notes.length > 0 ? (
                order.notes.map((note, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-2.5 rounded-lg bg-warmwhite border border-[#E8DDCB]/60 text-xs"
                  >
                    <p className="text-darktext">{note.text || note}</p>
                    {note.time && (
                      <span className="text-[10px] text-muted block mt-1">
                        {formatDate(note.time)}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted">
                  No internal staff notes recorded yet.
                </p>
              )}
            </div>

            {/* Add note input */}
            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                placeholder="Add an internal note (e.g. Courier tracking AWB, batch pack details)..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-colors shadow-xs"
              >
                Add Note
              </button>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Customer & Payment Details */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-darktext flex items-center gap-1.5">
              <User className="w-4 h-4 text-maroon" />
              <span>Customer Information</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-[10px] text-muted uppercase font-bold">
                  Full Name
                </span>
                <p className="font-semibold text-darktext">
                  {order.customerName}
                </p>
              </div>

              <div>
                <span className="text-[10px] text-muted uppercase font-bold">
                  Phone Number
                </span>
                <p className="text-darktext font-mono flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-muted" />
                  <span>{order.customerPhone || '+91 98401 23456'}</span>
                </p>
              </div>

              <div>
                <span className="text-[10px] text-muted uppercase font-bold">
                  Email Address
                </span>
                <p className="text-darktext flex items-center gap-1 mt-0.5 truncate">
                  <Mail className="w-3 h-3 text-muted" />
                  <span>{order.customerEmail || 'customer@gmail.com'}</span>
                </p>
              </div>

              <div className="pt-2 border-t border-[#E8DDCB]/60">
                <span className="text-[10px] text-muted uppercase font-bold">
                  Shipping Delivery Address
                </span>
                <p className="text-darktext flex items-start gap-1 mt-0.5 leading-relaxed">
                  <MapPin className="w-3.5 h-3.5 text-muted flex-shrink-0 mt-0.5" />
                  <span>
                    {order.deliveryAddress ||
                      '12, South Masi Street, Madurai, Tamil Nadu 625001'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-white rounded-xl border border-[#E8DDCB] p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-darktext flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-maroon" />
              <span>Payment Details</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted">Payment Status:</span>
                <StatusBadge status={order.paymentStatus} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted">Payment Method:</span>
                <span className="font-semibold uppercase text-darktext">
                  {order.paymentMethod || 'UPI Payment'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted">Amount Received:</span>
                <span className="font-mono font-bold text-darktext">
                  {order.paymentStatus === 'paid'
                    ? formatCurrency(order.total)
                    : '₹0'}
                </span>
              </div>

              {/* Status Update Quick Dropdown */}
              <div className="pt-2 border-t border-[#E8DDCB]/60">
                <label className="block text-[10px] text-muted uppercase font-bold mb-1">
                  Update Payment Status
                </label>
                <select
                  value={order.paymentStatus}
                  onChange={(e) =>
                    updatePaymentStatus(order.id, e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DDCB] bg-warmwhite text-xs font-semibold text-darktext focus:outline-none focus:border-gold capitalize"
                >
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
