import React from 'react';
import {
  Clock,
  CheckCircle2,
  Package,
  Truck,
  Check,
  XCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const StatusBadge = ({ status, type = 'order', size = 'sm' }) => {
  if (!status) return null;

  const normalized = String(status).toLowerCase();

  let bgClass = 'bg-cream text-darktext border-bordercream';
  let Icon = null;

  // Order Status Styles
  if (type === 'order') {
    switch (normalized) {
      case 'pending':
        bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
        Icon = Clock;
        break;
      case 'confirmed':
        bgClass = 'bg-blue-50 text-blue-800 border-blue-200';
        Icon = CheckCircle2;
        break;
      case 'processing':
        bgClass = 'bg-indigo-50 text-indigo-800 border-indigo-200';
        Icon = Package;
        break;
      case 'packed':
        bgClass = 'bg-purple-50 text-purple-800 border-purple-200';
        Icon = Package;
        break;
      case 'shipped':
        bgClass = 'bg-cyan-50 text-cyan-800 border-cyan-200';
        Icon = Truck;
        break;
      case 'delivered':
        bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
        Icon = Check;
        break;
      case 'cancelled':
        bgClass = 'bg-rose-50 text-rose-800 border-rose-200';
        Icon = XCircle;
        break;
      default:
        bgClass = 'bg-cream text-darktext border-bordercream';
        break;
    }
  }

  // Payment Status Styles
  if (type === 'payment') {
    switch (normalized) {
      case 'paid':
        bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
        Icon = Check;
        break;
      case 'pending':
        bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
        Icon = Clock;
        break;
      case 'failed':
        bgClass = 'bg-rose-50 text-rose-800 border-rose-200';
        Icon = XCircle;
        break;
      case 'refunded':
      case 'partially refunded':
        bgClass = 'bg-slate-100 text-slate-800 border-slate-300';
        Icon = RotateCcw;
        break;
      default:
        bgClass = 'bg-cream text-darktext border-bordercream';
        break;
    }
  }

  // Stock Status Styles
  if (type === 'stock') {
    switch (normalized) {
      case 'in stock':
        bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
        Icon = CheckCircle2;
        break;
      case 'low stock':
        bgClass = 'bg-amber-50 text-amber-800 border-amber-200';
        Icon = AlertTriangle;
        break;
      case 'out of stock':
        bgClass = 'bg-rose-50 text-rose-800 border-rose-200';
        Icon = XCircle;
        break;
      default:
        bgClass = 'bg-cream text-darktext border-bordercream';
        break;
    }
  }

  // General Active / Inactive
  if (type === 'active' || normalized === 'active' || normalized === 'inactive') {
    if (normalized === 'active' || normalized === 'published') {
      bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200';
      Icon = Check;
    } else {
      bgClass = 'bg-slate-100 text-slate-600 border-slate-200';
      Icon = XCircle;
    }
  }

  const sizeClasses = size === 'xs' ? 'text-[10px] px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5';

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full border shadow-2xs select-none ${bgClass} ${sizeClasses}`}
    >
      {Icon && <Icon className="w-3 h-3 flex-shrink-0" />}
      <span>{status}</span>
    </span>
  );
};

export default StatusBadge;
