import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [message, setMessage] = useState('');

  const validateEmail = (str) => {
    return /\S+@\S+\.\S+/.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setMessage('Please enter your email address.');
      return;
    }
    if (!validateEmail(email.trim())) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    // Honest frontend demonstration feedback
    setStatus('success');
    setMessage('Thank you for subscribing! (Demonstration UI: no data sent to external server)');
    setEmail('');
  };

  return (
    <section className="py-16 sm:py-20 bg-cream/40 border-b border-bordercream/70">
      <div className="page-container">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold-soft flex items-center justify-center text-maroon mx-auto border border-gold/40">
            <Mail className="w-6 h-6" />
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-darktext tracking-tight">
            Stay in the Festive Loop
          </h2>

          <p className="text-mutedtext text-sm sm:text-base leading-relaxed">
            Receive updates on limited festival batches, fresh seasonal savouries, and traditional snack stories.
          </p>

          <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status) setStatus(null);
                  }}
                  placeholder="Enter your email address..."
                  className="w-full bg-warmwhite border border-bordercream rounded-brand px-4 py-3 text-sm text-darktext placeholder:text-mutedtext focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon shadow-xs"
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                Subscribe
              </Button>
            </div>

            {/* Validation Feedback */}
            {status === 'success' && (
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-forest font-semibold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-errorred font-semibold animate-fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}

            <p className="text-[11px] text-mutedtext mt-3">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
