import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateCartTotals } from '../utils/cartCalculations';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'raji_snacks_cart_v1';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore localStorage write error
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product, selectedSize = null, quantity = 1) => {
    // If no size specified, use the first available size or default
    const sizeObj = selectedSize || (product.availableSizes && product.availableSizes[0]) || { size: 'Standard', price: product.price };
    const unitPrice = sizeObj.price || product.price;
    const cartItemId = `${product.slug}-${sizeObj.size}`;
    const maxStock = product.stock || 20;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === cartItemId);
      if (existingIndex > -1) {
        const existingItem = prev[existingIndex];
        const nextQty = Math.min(existingItem.quantity + quantity, maxStock);
        const updated = [...prev];
        updated[existingIndex] = {
          ...existingItem,
          quantity: nextQty
        };
        return updated;
      } else {
        const newItem = {
          id: cartItemId,
          slug: product.slug,
          name: product.name,
          tamilName: product.tamilName,
          category: product.category,
          categoryName: product.categoryName,
          image: product.image,
          size: sizeObj.size,
          price: unitPrice,
          originalPrice: product.originalPrice,
          quantity: Math.min(quantity, maxStock),
          maxStock: maxStock
        };
        return [...prev, newItem];
      }
    });

    addToast({
      message: `Added ${product.name} (${sizeObj.size}) to cart`,
      type: 'success'
    });
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prev => {
      if (newQuantity <= 0) {
        return prev.filter(item => item.id !== itemId);
      }
      return prev.map(item => {
        if (item.id === itemId) {
          const clamped = Math.min(newQuantity, item.maxStock || 50);
          return { ...item, quantity: clamped };
        }
        return item;
      });
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => {
      const itemToRemove = prev.find(item => item.id === itemId);
      if (itemToRemove) {
        addToast({
          message: `Removed ${itemToRemove.name} from cart`,
          type: 'info'
        });
      }
      return prev.filter(item => item.id !== itemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totals = calculateCartTotals(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        ...totals,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
