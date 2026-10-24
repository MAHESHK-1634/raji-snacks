import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

export const AnnouncementBar = () => {
  const { announcement } = siteConfig;
  if (!announcement) return null;

  return (
    <aside aria-label="Announcement" className="bg-maroon text-warmwhite text-xs py-2 px-4 relative z-40 border-b border-maroon-dark">
      <div className="page-container flex items-center justify-between sm:justify-center gap-3">
        <div className="flex items-center gap-2 text-center overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-gold flex-shrink-0 animate-pulse" />
          <p className="font-medium tracking-wide truncate">
            {announcement.text}
          </p>
        </div>

        {announcement.linkText && (
          <Link
            to={announcement.linkUrl}
            className="hidden sm:inline-flex items-center gap-1 text-gold hover:text-white font-semibold underline decoration-gold/60 underline-offset-2 hover:decoration-white transition-colors flex-shrink-0"
          >
            <span>{announcement.linkText}</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </aside>
  );
};

export default AnnouncementBar;
