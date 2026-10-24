import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export const ReturnsPolicyPage = () => {
  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container max-w-4xl">
        <Breadcrumbs items={[{ label: 'Returns & Refunds' }]} />

        <div className="mt-4 mb-8 pb-4 border-b border-bordercream/70">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
            Customer Guarantee
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Returns & Replacement Policy
          </h1>
          <p className="text-xs text-mutedtext mt-1 italic">
            *Draft food return policy for Raji Snacks customer care.
          </p>
        </div>

        <div className="text-mutedtext text-sm sm:text-base space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">1. Food & Perishable Products Policy</h2>
            <p>
              Due to food safety hygiene regulations, opened or consumed food packages cannot be returned. However, our customer satisfaction guarantee protects every purchase.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">2. Damaged or Compromised Shipments</h2>
            <p>
              If your parcel arrives with tampered outer packaging or damaged contents, please take a photograph of the condition and notify our care team within 24 hours of delivery at <strong className="text-darktext">hello@rajisnacks.com</strong> or via WhatsApp.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">3. Free Replacement or Refund</h2>
            <p>
              Verified damaged or incorrect shipments will be promptly replaced with a fresh dispatch at zero additional cost, or refunded back to the original payment method within 5 to 7 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
