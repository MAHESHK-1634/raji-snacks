import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

export const PrivacyPolicyPage = () => {
  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container max-w-4xl">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <div className="mt-4 mb-8 pb-4 border-b border-bordercream/70">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-1">
            Store Policies
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-mutedtext mt-1 italic">
            *Draft demonstration policy template for Raji Snacks storefront.
          </p>
        </div>

        <div className="prose prose-stone text-mutedtext text-sm sm:text-base space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">1. Overview</h2>
            <p>
              At Raji Snacks, accessible from our online storefront, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Raji Snacks and how we use it.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">2. Information We Collect</h2>
            <p>
              When you place a demonstration order or inquire via our contact form, you may be asked to enter your name, email address, phone number, and physical mailing address for dispatch and customer communication.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">3. How We Use Your Information</h2>
            <p>
              We use the collected information solely to process and deliver your snack orders, communicate updates regarding shipment tracking, respond to customer inquiries, and ensure freshness of delivery.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">4. Data Security</h2>
            <p>
              We implement industry-standard administrative and electronic safeguards to preserve your personal data. We never sell, lease, or distribute customer details to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-display font-bold text-xl text-darktext">5. Contact Information</h2>
            <p>
              If you have any questions or require more information about our Privacy Policy, do not hesitate to reach out to us at <strong className="text-darktext">hello@rajisnacks.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
