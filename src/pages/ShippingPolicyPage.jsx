import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export const ShippingPolicyPage = () => {
  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container max-w-4xl">
        <Breadcrumbs items={[{ label: 'Shipping Policy' }]} />

        <div className="mt-4 mb-8 pb-4 border-b border-bordercream/70">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
            Delivery Information
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-mutedtext mt-1 italic">
            *Draft delivery terms for Raji Snacks Pan-India distribution.
          </p>
        </div>

        <div className="text-mutedtext text-sm sm:text-base space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">1. Fresh Batch Dispatch</h2>
            <p>
              To ensure unmatched crunch, all orders are prepared in fresh morning batches. Orders placed before 1:00 PM IST on business days are dispatched within 24 to 48 hours.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">2. Delivery Timeframes</h2>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Within Tamil Nadu & South India:</strong> 2 to 3 business days.</li>
              <li><strong>Major Metros across India (Mumbai, Delhi, Kolkata):</strong> 3 to 5 business days.</li>
              <li><strong>Rest of India:</strong> 4 to 6 business days.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">3. Protective Packaging</h2>
            <p>
              Delicate items such as Kai Murukku and Thenkuzhal are packed in triple-ply shock-resistant corrugated cartons with nitrogen-flushed or sealed barrier pouches to prevent breakage during transit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">4. Shipping Charges</h2>
            <p>
              Standard shipping fee is ₹50 on domestic orders. Orders with a cart value exceeding ₹499 qualify for complimentary Free Express Delivery across India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
