import React from 'react';
import { Check, Clock, X } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const STAGES = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered'];

export const OrderTimeline = ({ orderStatus, timeline = [] }) => {
  const isCancelled = orderStatus === 'Cancelled';
  const currentIndex = isCancelled ? -1 : STAGES.indexOf(orderStatus);

  return (
    <div className="py-4">
      {isCancelled ? (
        <div className="flex items-center gap-3 p-3 rounded-brand bg-rose-50 border border-rose-200 text-rose-800 text-xs">
          <X className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <div>
            <p className="font-bold">Order Cancelled</p>
            <p className="text-[11px] opacity-80">This order has been cancelled and cannot proceed through standard fulfilment stages.</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Progress Bar Line */}
          <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-bordercream -translate-y-1/2 z-0" />
          <div
            className="hidden sm:block absolute top-1/2 left-0 h-1 bg-forest -translate-y-1/2 z-0 transition-all duration-300"
            style={{
              width: currentIndex >= 0 ? `${(currentIndex / (STAGES.length - 1)) * 100}%` : '0%'
            }}
          />

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 relative z-10">
            {STAGES.map((stage, idx) => {
              const isPast = idx <= currentIndex;
              const isCurrent = idx === currentIndex;
              const timelineRecord = timeline.find((t) => t.status === stage);

              return (
                <div key={stage} className="flex sm:flex-col items-center gap-2 sm:text-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                      isPast
                        ? 'bg-forest text-warmwhite border-forest'
                        : isCurrent
                        ? 'bg-warmwhite text-forest border-forest ring-4 ring-forest/10'
                        : 'bg-warmwhite text-mutedtext border-bordercream'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold leading-tight ${
                        isCurrent
                          ? 'text-forest font-extrabold'
                          : isPast
                          ? 'text-darktext'
                          : 'text-mutedtext'
                      }`}
                    >
                      {stage}
                    </p>
                    {timelineRecord && (
                      <span className="text-[10px] text-mutedtext block truncate">
                        {formatDate(timelineRecord.time, true)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
