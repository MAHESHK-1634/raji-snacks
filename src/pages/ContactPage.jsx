import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import Breadcrumbs from '../components/common/Breadcrumbs';
import Button from '../components/common/Button';
import { siteConfig } from '../data/siteConfig';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please choose or enter a subject';
    if (!formData.message.trim()) errs.message = 'Please type your message';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 700);
  };

  return (
    <div className="py-6 sm:py-10 bg-warmwhite min-h-screen">
      <div className="page-container">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        {/* Heading */}
        <div className="mt-4 mb-12 text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block">
            Customer Assistance
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            We Would Love to Hear From You
          </h1>
          <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
            Have questions regarding our traditional savouries, bulk festive gifting, or delivery queries? Send us a note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          
          {/* Left: Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-cream/40 rounded-brand-lg border border-bordercream p-6 space-y-6">
              <h3 className="font-display font-bold text-xl text-darktext pb-3 border-b border-bordercream/70">
                Reach Out Directly
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center text-maroon flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-darktext block">Email Inquiries</span>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-maroon hover:underline">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center text-maroon flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-darktext block">Phone / WhatsApp</span>
                    <span className="text-mutedtext">{siteConfig.contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center text-maroon flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-darktext block">Production Kitchen</span>
                    <span className="text-mutedtext leading-relaxed">{siteConfig.contact.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-soft flex items-center justify-center text-maroon flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-darktext block">Operational Hours</span>
                    <span className="text-mutedtext">{siteConfig.contact.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-bordercream/70 text-[11px] text-mutedtext italic">
                *{siteConfig.contact.note}
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-warmwhite rounded-brand-lg border border-bordercream shadow-soft p-6 sm:p-8">
              <h3 className="font-display font-bold text-xl text-darktext mb-6">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="py-8 text-center space-y-3 bg-cream/30 rounded-brand p-6 border border-bordercream animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-forest-50 text-forest mx-auto flex items-center justify-center border border-forest/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-darktext">
                    Message Received!
                  </h4>
                  <p className="text-xs sm:text-sm text-mutedtext max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. (Frontend Demonstration: no message was transmitted to a live server.)
                  </p>
                  <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-darktext mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Sundar K."
                        className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                          errors.name ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                        }`}
                      />
                      {errors.name && <p className="text-xs text-errorred mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-darktext mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="sundar@example.com"
                        className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                          errors.email ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                        }`}
                      />
                      {errors.email && <p className="text-xs text-errorred mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-darktext mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Festival Bulk Order Inquiry"
                      className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                        errors.subject ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-errorred mt-1">{errors.subject}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-darktext mb-1">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share your question or feedback..."
                      className={`w-full bg-cream/30 border rounded-brand px-3.5 py-2.5 text-sm text-darktext focus:outline-none focus:ring-1 ${
                        errors.message ? 'border-errorred focus:ring-errorred' : 'border-bordercream focus:border-maroon focus:ring-maroon'
                      }`}
                    />
                    {errors.message && <p className="text-xs text-errorred mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      loading={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      <span>Send Demonstration Message</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
