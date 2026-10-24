/**
 * Calculate summary KPI metrics from centralized mock state
 */
export const calculateDashboardKPIs = (orders = [], products = [], customers = []) => {
  // Only valid paid orders count towards collected sales
  const validPaidOrders = orders.filter(
    (o) => (o.paymentStatus?.toLowerCase() === 'paid') && o.orderStatus?.toLowerCase() !== 'cancelled'
  );

  const totalGrossSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const collectedSales = validPaidOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  
  // Total refunded amounts
  const totalRefunds = orders
    .filter((o) => o.paymentStatus?.toLowerCase() === 'refunded' || o.orderStatus?.toLowerCase() === 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const netSales = Math.max(0, collectedSales - totalRefunds);

  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.orderStatus?.toLowerCase() === 'pending').length;

  const totalProductsCount = products.length;
  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock <= (p.lowStockThreshold || 15)
  ).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const totalCustomersCount = customers.length;
  const averageOrderValue = validPaidOrders.length > 0 
    ? Math.round(collectedSales / validPaidOrders.length) 
    : 0;

  return {
    totalSales: totalGrossSales,
    totalGrossSales,
    collectedSales,
    netSales,
    totalRefunds,
    totalOrders: totalOrdersCount,
    totalOrdersCount,
    pendingOrders: pendingOrdersCount,
    pendingOrdersCount,
    totalProducts: totalProductsCount,
    totalProductsCount,
    lowStockCount,
    outOfStockCount,
    totalCustomers: totalCustomersCount,
    totalCustomersCount,
    averageOrderValue
  };
};

export const calculateKPIs = calculateDashboardKPIs;

/**
 * Generate chart time-series data for the sales overview chart
 */
export const getSalesChartData = (orders = [], period = '30d') => {
  if (period === '7d') {
    return [
      { date: '18 Oct', revenue: 2150, orders: 2 },
      { date: '19 Oct', revenue: 1650, orders: 1 },
      { date: '20 Oct', revenue: 2980, orders: 3 },
      { date: '21 Oct', revenue: 1260, orders: 1 },
      { date: '22 Oct', revenue: 3450, orders: 4 },
      { date: '23 Oct', revenue: 4280, orders: 5 },
      { date: '24 Oct', revenue: 1955, orders: 2 }
    ];
  } else if (period === '90d') {
    return [
      { date: 'Aug W1', revenue: 8400, orders: 9 },
      { date: 'Aug W2', revenue: 11200, orders: 12 },
      { date: 'Aug W3', revenue: 9800, orders: 10 },
      { date: 'Aug W4', revenue: 14500, orders: 16 },
      { date: 'Sep W1', revenue: 16200, orders: 18 },
      { date: 'Sep W2', revenue: 13900, orders: 14 },
      { date: 'Sep W3', revenue: 18400, orders: 21 },
      { date: 'Sep W4', revenue: 22100, orders: 24 },
      { date: 'Oct W1', revenue: 26500, orders: 29 },
      { date: 'Oct W2', revenue: 29800, orders: 34 },
      { date: 'Oct W3', revenue: 34200, orders: 38 }
    ];
  } else if (period === '1y') {
    return [
      { date: 'Nov 25', revenue: 28000, orders: 30 },
      { date: 'Dec 25', revenue: 42000, orders: 46 },
      { date: 'Jan 26', revenue: 58000, orders: 62 },
      { date: 'Feb 26', revenue: 34000, orders: 38 },
      { date: 'Mar 26', revenue: 31000, orders: 35 },
      { date: 'Apr 26', revenue: 36000, orders: 40 },
      { date: 'May 26', revenue: 29000, orders: 31 },
      { date: 'Jun 26', revenue: 27500, orders: 29 },
      { date: 'Jul 26', revenue: 31200, orders: 33 },
      { date: 'Aug 26', revenue: 38900, orders: 42 },
      { date: 'Sep 26', revenue: 46500, orders: 51 },
      { date: 'Oct 26', revenue: 64200, orders: 72 }
    ];
  } else {
    // Default: '30d'
    return [
      { date: '25 Sep', revenue: 1800, orders: 2 },
      { date: '28 Sep', revenue: 2450, orders: 3 },
      { date: '01 Oct', revenue: 3900, orders: 4 },
      { date: '04 Oct', revenue: 2850, orders: 3 },
      { date: '07 Oct', revenue: 4600, orders: 5 },
      { date: '10 Oct', revenue: 5200, orders: 6 },
      { date: '13 Oct', revenue: 4100, orders: 4 },
      { date: '16 Oct', revenue: 6400, orders: 7 },
      { date: '19 Oct', revenue: 5800, orders: 6 },
      { date: '22 Oct', revenue: 7300, orders: 8 },
      { date: '24 Oct', revenue: 4950, orders: 5 }
    ];
  }
};

/**
 * Breakdown of orders by status
 */
export const getOrderStatusBreakdown = (orders = []) => {
  const statuses = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Delivered', 'Cancelled'];
  return statuses.map((status) => {
    const count = orders.filter((o) => o.orderStatus?.toLowerCase() === status.toLowerCase()).length;
    return { status, count };
  });
};

/**
 * Get top selling products aggregated from order items
 * Supports (products, orders, limit) or (orders, products)
 */
export const getTopSellingProducts = (first = [], second = [], limit = 5) => {
  let products = [];
  let orders = [];

  // Determine which is products and which is orders based on structure
  if (Array.isArray(first) && first.length > 0 && (first[0].stock !== undefined || first[0].slug !== undefined)) {
    products = first;
    orders = second;
  } else {
    orders = first;
    products = second;
  }

  const salesMap = {};

  orders.forEach((order) => {
    if (order.orderStatus?.toLowerCase() !== 'cancelled' && Array.isArray(order.items)) {
      order.items.forEach((item) => {
        const pId = item.id || item.productId || item.name;
        if (!salesMap[pId]) {
          salesMap[pId] = {
            unitsSold: 0,
            revenue: 0
          };
        }
        const q = item.quantity || 1;
        salesMap[pId].unitsSold += q;
        salesMap[pId].revenue += (item.price || 0) * q;
      });
    }
  });

  const ranked = products.map((prod) => {
    const pId = prod.id || prod.name;
    const soldData = salesMap[pId] || salesMap[prod.name] || {
      unitsSold: prod.unitsSold || Math.floor(Math.random() * 20 + 10),
      revenue: (prod.unitsSold || 15) * (prod.price || 100)
    };
    return {
      id: prod.id,
      name: prod.name,
      category: prod.category || prod.categoryName || 'murukku',
      image: prod.image,
      stock: prod.stock,
      lowStockThreshold: prod.lowStockThreshold || 15,
      price: prod.price,
      unitsSold: soldData.unitsSold,
      revenue: soldData.revenue
    };
  }).sort((a, b) => b.unitsSold - a.unitsSold);

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked;
};
