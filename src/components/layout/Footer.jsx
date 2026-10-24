import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowUp, Heart, ShieldCheck } from 'lucide-react';
import { categories } from '../../data/categories';
import { siteConfig } from '../../data/siteConfig';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#231E1B] text-warmwhite/80 border-t border-bordercream/20 pt-16 pb-12 mt-20 relative">
      <div className="page-container">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-warmwhite/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display font-extrabold text-3xl tracking-wider text-warmwhite">
                RAJI SNACKS
              </span>
              <span className="block text-xs tracking-widest text-gold font-bold uppercase mt-0.5">
                Authentic South Indian Crunch
              </span>
            </Link>
            <p className="text-sm text-warmwhite/70 max-w-sm leading-relaxed">
              Handcrafting the purest traditional savouries with time-tested recipes from Tamil Nadu. From golden spirals of Thenkuzhal to peppery Kara Sevu, we celebrate every crunch with authentic passion.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {siteConfig.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-warmwhite/10 hover:bg-gold hover:text-darktext flex items-center justify-center text-xs font-bold transition-all"
                  aria-label={`Follow Raji Snacks on ${item.name}`}
                >
                  {item.name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="font-display font-bold text-base text-warmwhite mb-4 tracking-wide text-gold">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/category/${cat.slug}`}
                    className="hover:text-gold transition-colors block py-0.5"
                  >
                    {cat.name} ({cat.productCount})
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/shop" className="text-gold hover:underline font-semibold block py-0.5">
                  View All Snacks →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-display font-bold text-base text-warmwhite mb-4 tracking-wide text-gold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-gold transition-colors block py-0.5">
                  Our Heritage & Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold transition-colors block py-0.5">
                  Customer Assistance
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-gold transition-colors block py-0.5">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-gold transition-colors block py-0.5">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-gold transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gold transition-colors block py-0.5">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="font-display font-bold text-base text-warmwhite mb-4 tracking-wide text-gold">
              Customer Support
            </h4>
            <p className="text-xs text-warmwhite/50 mb-3 italic">
              *Configurable demonstration contact info
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-warmwhite/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-gold transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmwhite/60">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© {currentYear} {siteConfig.name}. Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-gold inline fill-gold" />
            <span>in Tamil Nadu, India. All Rights Reserved.</span>
          </p>

          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warmwhite/10 hover:bg-gold hover:text-darktext transition-colors text-gold text-xs font-semibold"
              title="Access Admin Operations Dashboard"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>

            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-warmwhite/10 hover:bg-gold hover:text-darktext transition-colors text-warmwhite text-xs font-semibold"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
