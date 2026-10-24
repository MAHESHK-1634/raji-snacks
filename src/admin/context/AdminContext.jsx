import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initialAdminProducts,
  initialAdminCategories,
  initialAdminOrders,
  initialAdminCustomers,
  initialAdminInvoices,
  initialAdminBanners,
  initialAdminCoupons,
  initialAdminReturns,
  initialAdminNotifications,
  initialAdminSettings,
  initialInventoryLogs,
  initialAdminActivityLogs
} from '../data/initialAdminData';

const AdminContext = createContext(null);
const STORAGE_KEY = 'raji_snacks_admin_state_v1';

export const AdminProvider = ({ children }) => {
  // Load state from localStorage or initialize with clean defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse admin state from localStorage', e);
    }
    return {
      products: initialAdminProducts,
      categories: initialAdminCategories,
      orders: initialAdminOrders,
      customers: initialAdminCustomers,
      invoices: initialAdminInvoices,
      banners: initialAdminBanners,
      coupons: initialAdminCoupons,
      returns: initialAdminReturns,
      notifications: initialAdminNotifications,
      settings: initialAdminSettings,
      inventoryLogs: initialInventoryLogs,
      activityLogs: initialAdminActivityLogs
    };
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist admin state to localStorage', e);
    }
  }, [data]);

  // Activity Logger helper
  const addActivityLog = useCallback((event) => {
    const logItem = {
      id: `ACT-${Date.now()}`,
      time: new Date().toISOString(),
      event
    };
    setData((prev) => ({
      ...prev,
      activityLogs: [logItem, ...prev.activityLogs.slice(0, 49)]
    }));
  }, []);

  // System Notification helper
  const addNotification = useCallback((type, title, message, link = '/admin') => {
    const notif = {
      id: `NOTIF-${Date.now()}`,
      type,
      title,
      message,
      time: new Date().toISOString(),
      isRead: false,
      link
    };
    setData((prev) => ({
      ...prev,
      notifications: [notif, ...prev.notifications]
    }));
  }, []);

  // ==========================================
  // PRODUCT ACTIONS
  // ==========================================
  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `RS-${Date.now().toString(36).toUpperCase()}`,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      unitsSold: 0
    };

    setData((prev) => {
      const updatedProducts = [newProduct, ...prev.products];
      // Sync category count
      const updatedCategories = prev.categories.map((cat) => {
        if (cat.slug === newProduct.category || cat.id === newProduct.category) {
          return { ...cat, productCount: (cat.productCount || 0) + 1 };
        }
        return cat;
      });

      return {
        ...prev,
        products: updatedProducts,
        categories: updatedCategories
      };
    });

    addActivityLog(`Created new product: ${newProduct.name}`);
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setData((prev) => {
      const existingProduct = prev.products.find((p) => p.id === id);
      if (!existingProduct) return prev;

      const categoryChanged = existingProduct.category !== updatedData.category;

      const updatedProducts = prev.products.map((p) => {
        if (p.id === id) {
          return { ...p, ...updatedData, updatedAt: new Date().toISOString() };
        }
        return p;
      });

      // Recalculate category counts if category changed
      let updatedCategories = prev.categories;
      if (categoryChanged) {
        updatedCategories = prev.categories.map((cat) => {
          const count = updatedProducts.filter((p) => p.category === cat.slug || p.category === cat.id).length;
          return { ...cat, productCount: count };
        });
      }

      return {
        ...prev,
        products: updatedProducts,
        categories: updatedCategories
      };
    });

    addActivityLog(`Updated product: ${updatedData.name || id}`);
  };

  const deleteProduct = (id) => {
    setData((prev) => {
      const prodToDelete = prev.products.find((p) => p.id === id);
      if (!prodToDelete) return prev;

      const updatedProducts = prev.products.filter((p) => p.id !== id);
      const updatedCategories = prev.categories.map((cat) => {
        if (cat.slug === prodToDelete.category || cat.id === prodToDelete.category) {
          return { ...cat, productCount: Math.max(0, (cat.productCount || 1) - 1) };
        }
        return cat;
      });

      return {
        ...prev,
        products: updatedProducts,
        categories: updatedCategories
      };
    });

    addActivityLog(`Deleted product ID: ${id}`);
  };

  const toggleProductStatus = (id) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id === id) {
          const next = !p.isPublished;
          addActivityLog(`${next ? 'Published' : 'Unpublished'} product: ${p.name}`);
          return { ...p, isPublished: next };
        }
        return p;
      })
    }));
  };

  // ==========================================
  // CATEGORY ACTIONS
  // ==========================================
  const addCategory = (categoryData) => {
    const newCategory = {
      ...categoryData,
      id: categoryData.id || categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      productCount: 0,
      isVisible: true,
      createdAt: new Date().toISOString()
    };

    setData((prev) => ({
      ...prev,
      categories: [...prev.categories, newCategory]
    }));

    addActivityLog(`Added new category: ${newCategory.name}`);
    return newCategory;
  };

  const updateCategory = (id, updatedData) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    }));

    addActivityLog(`Updated category: ${updatedData.name || id}`);
  };

  const deleteCategory = (id) => {
    // Validate if any products belong to this category
    const hasProducts = data.products.some((p) => p.category === id);
    if (hasProducts) {
      throw new Error('Cannot delete category with associated products. Reassign or delete the products first.');
    }

    setData((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c.id !== id)
    }));

    addActivityLog(`Deleted category ID: ${id}`);
  };

  const toggleCategoryVisibility = (id) => {
    setData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) => {
        if (c.id === id) {
          const next = !c.isVisible;
          addActivityLog(`${next ? 'Enabled' : 'Hidden'} category visibility: ${c.name}`);
          return { ...c, isVisible: next };
        }
        return c;
      })
    }));
  };

  // ==========================================
  // INVENTORY ACTIONS
  // ==========================================
  const adjustStock = (productId, newQuantity, reason = 'Manual Inventory Adjustment') => {
    const qty = Math.max(0, parseInt(newQuantity, 10) || 0);

    setData((prev) => {
      const prod = prev.products.find((p) => p.id === productId);
      if (!prod) return prev;

      const prevStock = prod.stock || 0;
      const change = qty - prevStock;

      const updatedProducts = prev.products.map((p) => {
        if (p.id === productId) {
          return { ...p, stock: qty, updatedAt: new Date().toISOString() };
        }
        return p;
      });

      const newLog = {
        id: `ADJ-${Date.now()}`,
        productId: prod.id,
        productName: prod.name,
        prevStock,
        change,
        newStock: qty,
        reason,
        timestamp: new Date().toISOString()
      };

      // Check for low stock notification
      if (qty <= (prod.lowStockThreshold || 15) && qty > 0) {
        addNotification('inventory', `Low Stock Alert: ${prod.name}`, `Stock fell to ${qty} units.`, '/admin/inventory');
      } else if (qty === 0) {
        addNotification('inventory', `Out of Stock Alert: ${prod.name}`, `Product is completely out of stock!`, '/admin/inventory');
      }

      return {
        ...prev,
        products: updatedProducts,
        inventoryLogs: [newLog, ...prev.inventoryLogs]
      };
    });

    addActivityLog(`Adjusted stock for ${productId} to ${qty} units (${reason})`);
  };

  // ==========================================
  // ORDER ACTIONS
  // ==========================================
  const updateOrderStatus = (orderId, newStatus, note = '') => {
    setData((prev) => {
      const order = prev.orders.find((o) => o.id === orderId);
      if (!order) return prev;

      const newTimelineItem = {
        status: newStatus,
        time: new Date().toISOString(),
        note: note || `Status updated to ${newStatus}`
      };

      const updatedOrders = prev.orders.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: newStatus,
            timeline: [...(o.timeline || []), newTimelineItem]
          };
        }
        return o;
      });

      return {
        ...prev,
        orders: updatedOrders
      };
    });

    addActivityLog(`Order ${orderId} status updated to: ${newStatus}`);
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o))
    }));

    addActivityLog(`Order ${orderId} payment status set to: ${newPaymentStatus}`);
  };

  const addOrderNote = (orderId, noteText) => {
    setData((prev) => ({
      ...prev,
      orders: prev.orders.map((o) => {
        if (o.id === orderId) {
          const combined = o.internalNotes ? `${o.internalNotes}\n${noteText}` : noteText;
          return { ...o, internalNotes: combined };
        }
        return o;
      })
    }));

    addActivityLog(`Added internal note to Order ${orderId}`);
  };

  const cancelOrder = (orderId, reason = 'Cancelled by administrator') => {
    updateOrderStatus(orderId, 'Cancelled', reason);
  };

  // ==========================================
  // BILLING & INVOICE ACTIONS
  // ==========================================
  const generateInvoice = (orderId) => {
    const existing = data.invoices.find((inv) => inv.orderId === orderId);
    if (existing) {
      return existing;
    }

    const order = data.orders.find((o) => o.id === orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const nextNumber = data.invoices.length + 1;
    const invId = `INV-2026-${String(nextNumber).padStart(3, '0')}`;

    const newInvoice = {
      id: invId,
      orderId: order.id,
      invoiceDate: new Date().toISOString(),
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        address: order.customer.address
      },
      items: order.items.map((i) => ({
        name: `${i.name} (${i.size})`,
        quantity: i.quantity,
        price: i.price,
        total: i.price * i.quantity
      })),
      subtotal: order.subtotal,
      discount: order.discountAmount || 0,
      shipping: order.shippingFee || 0,
      tax: order.taxAmount || 0,
      grandTotal: order.total,
      paymentStatus: order.paymentStatus,
      invoiceStatus: 'Issued'
    };

    setData((prev) => ({
      ...prev,
      invoices: [newInvoice, ...prev.invoices]
    }));

    addActivityLog(`Generated Invoice ${invId} for Order ${orderId}`);
    return newInvoice;
  };

  // ==========================================
  // COUPON ACTIONS
  // ==========================================
  const addCoupon = (couponData) => {
    const newCoupon = {
      ...couponData,
      id: `CPN-${Date.now().toString().slice(-4)}`,
      code: couponData.code.trim().toUpperCase(),
      usageCount: 0,
      status: 'Active'
    };

    setData((prev) => ({
      ...prev,
      coupons: [newCoupon, ...prev.coupons]
    }));

    addActivityLog(`Created coupon: ${newCoupon.code}`);
    return newCoupon;
  };

  const updateCoupon = (id, updatedData) => {
    setData((prev) => ({
      ...prev,
      coupons: prev.coupons.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    }));

    addActivityLog(`Updated coupon: ${updatedData.code || id}`);
  };

  const toggleCouponStatus = (id) => {
    setData((prev) => ({
      ...prev,
      coupons: prev.coupons.map((c) => {
        if (c.id === id) {
          const next = c.status === 'Active' ? 'Inactive' : 'Active';
          return { ...c, status: next };
        }
        return c;
      })
    }));
  };

  const deleteCoupon = (id) => {
    setData((prev) => ({
      ...prev,
      coupons: prev.coupons.filter((c) => c.id !== id)
    }));
    addActivityLog(`Deleted coupon ID: ${id}`);
  };

  // ==========================================
  // BANNER ACTIONS
  // ==========================================
  const addBanner = (bannerData) => {
    const newBanner = {
      ...bannerData,
      id: `BAN-${Date.now().toString().slice(-4)}`,
      status: bannerData.status || 'Active'
    };

    setData((prev) => ({
      ...prev,
      banners: [newBanner, ...prev.banners]
    }));

    addActivityLog(`Created promo banner: ${newBanner.name}`);
    return newBanner;
  };

  const updateBanner = (id, updatedData) => {
    setData((prev) => ({
      ...prev,
      banners: prev.banners.map((b) => (b.id === id ? { ...b, ...updatedData } : b))
    }));
    addActivityLog(`Updated banner: ${updatedData.name || id}`);
  };

  const toggleBannerStatus = (id) => {
    setData((prev) => ({
      ...prev,
      banners: prev.banners.map((b) => {
        if (b.id === id) {
          const next = b.status === 'Active' ? 'Inactive' : 'Active';
          return { ...b, status: next };
        }
        return b;
      })
    }));
  };

  const deleteBanner = (id) => {
    setData((prev) => ({
      ...prev,
      banners: prev.banners.filter((b) => b.id !== id)
    }));
    addActivityLog(`Deleted banner ID: ${id}`);
  };

  // ==========================================
  // RETURN & REFUND ACTIONS
  // ==========================================
  const updateReturnStatus = (returnId, newStatus, resolutionNotes = '') => {
    setData((prev) => {
      const updatedReturns = prev.returns.map((ret) => {
        if (ret.id === returnId) {
          const updated = {
            ...ret,
            status: newStatus,
            resolutionNotes: resolutionNotes || ret.resolutionNotes
          };
          if (newStatus === 'Completed') {
            updated.completedDate = new Date().toISOString();
          }
          return updated;
        }
        return ret;
      });

      // If marked as Completed refund, also mark matching order payment as Refunded
      let updatedOrders = prev.orders;
      if (newStatus === 'Completed') {
        const targetRet = prev.returns.find((r) => r.id === returnId);
        if (targetRet && targetRet.orderId) {
          updatedOrders = prev.orders.map((o) => {
            if (o.id === targetRet.orderId) {
              return { ...o, paymentStatus: 'Refunded' };
            }
            return o;
          });
        }
      }

      return {
        ...prev,
        returns: updatedReturns,
        orders: updatedOrders
      };
    });

    addActivityLog(`Updated Return ${returnId} status to: ${newStatus}`);
  };

  // ==========================================
  // NOTIFICATIONS
  // ==========================================
  const markNotificationAsRead = (id) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    }));
  };

  const markAllNotificationsAsRead = () => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, isRead: true }))
    }));
  };

  const deleteNotification = (id) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.filter((n) => n.id !== id)
    }));
  };

  // ==========================================
  // SETTINGS & DEMO RESET
  // ==========================================
  const updateSettings = (newSettings) => {
    setData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
    addActivityLog('Updated store and business settings');
  };

  const resetDemoData = () => {
    const cleanState = {
      products: initialAdminProducts,
      categories: initialAdminCategories,
      orders: initialAdminOrders,
      customers: initialAdminCustomers,
      invoices: initialAdminInvoices,
      banners: initialAdminBanners,
      coupons: initialAdminCoupons,
      returns: initialAdminReturns,
      notifications: initialAdminNotifications,
      settings: initialAdminSettings,
      inventoryLogs: initialInventoryLogs,
      activityLogs: initialAdminActivityLogs
    };
    setData(cleanState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanState));
    } catch {
      // ignore
    }
  };

  return (
    <AdminContext.Provider
      value={{
        ...data,
        sidebarCollapsed,
        setSidebarCollapsed,
        isMobileSidebarOpen,
        setIsMobileSidebarOpen,
        // Product Actions
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        // Category Actions
        addCategory,
        updateCategory,
        deleteCategory,
        toggleCategoryVisibility,
        // Inventory Actions
        adjustStock,
        // Order Actions
        updateOrderStatus,
        updatePaymentStatus,
        addOrderNote,
        cancelOrder,
        // Billing Actions
        generateInvoice,
        // Coupon Actions
        addCoupon,
        updateCoupon,
        toggleCouponStatus,
        deleteCoupon,
        // Banner Actions
        addBanner,
        updateBanner,
        toggleBannerStatus,
        deleteBanner,
        // Return Actions
        updateReturnStatus,
        // Notification Actions
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        // Settings Actions
        updateSettings,
        resetDemoData
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
