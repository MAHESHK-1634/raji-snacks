import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'raji_snacks_wishlist_v1';

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore localStorage write errors
    }
  }, [wishlist]);

  const isInWishlist = (slug) => {
    return wishlist.some(item => item.slug === slug);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.slug === product.slug);
      if (exists) {
        addToast({
          message: `Removed ${product.name} from favourites`,
          type: 'info'
        });
        return prev.filter(item => item.slug !== product.slug);
      } else {
        addToast({
          message: `Saved ${product.name} to favourites`,
          type: 'success'
        });
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (slug) => {
    setWishlist(prev => prev.filter(item => item.slug !== slug));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
