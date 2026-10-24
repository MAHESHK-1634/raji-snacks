import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export const TermsPage = () => {
  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container max-w-4xl">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <div className="mt-4 mb-8 pb-4 border-b border-bordercream/70">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
            Store Policies
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-mutedtext mt-1 italic">
            *Draft demonstration terms for Raji Snacks online operations.
          </p>
        </div>

        <div className="text-mutedtext text-sm sm:text-base space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">1. Acceptance of Terms</h2>
            <p>
              By accessing and placing orders through the Raji Snacks website, you confirm agreement with these terms of service and acceptable usage guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">2. Product Presentation & Pricing</h2>
            <p>
              Prices, sizes, and product availability are stated in Indian Rupees (INR) and are subject to confirmation at time of order placement. While we endeavor to ensure all food photography accurately reflects our artisanal savouries, slight artisanal variations in shape, coil density, and coloration are natural to handmade snacks.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">3. Perishable Goods</h2>
            <p>
              Our savouries are prepared without artificial chemical preservatives. Customers are advised to store products in airtight containers immediately upon receipt to preserve optimal crispness and shelf life.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">4. Governing Law</h2>
            <p>
              These terms are construed in accordance with the laws of the State of Tamil Nadu and the Republic of India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
