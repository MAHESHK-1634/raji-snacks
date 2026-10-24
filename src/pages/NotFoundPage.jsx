import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Cookie } from 'lucide-react';
import Button from '../components/common/Button';

export const NotFoundPage = () => {
  return (
    <div className="py-24 sm:py-32 bg-warmwhite min-h-[75vh] flex items-center justify-center">
      <div className="page-container text-center max-w-lg mx-auto">
        
        <div className="w-20 h-20 rounded-full bg-gold-soft flex items-center justify-center text-maroon mx-auto mb-6 border border-gold/40 shadow-soft">
          <Cookie className="w-10 h-10" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-gold-dark block mb-2">
          Error 404
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-darktext tracking-tight mb-4">
          This Page Has Crumbled Away
        </h1>

        <p className="text-mutedtext text-sm sm:text-base mb-8 leading-relaxed">
          The page you are looking for doesn't exist or may have been relocated. Let's get you back to our fresh savouries.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Homepage</span>
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              <span>Browse All Snacks</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
