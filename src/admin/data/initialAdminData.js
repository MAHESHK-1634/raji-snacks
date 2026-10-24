import { products as initialStoreProducts } from '../../data/products';
import { categories as initialStoreCategories } from '../../data/categories';

export const initialAdminProducts = initialStoreProducts.map((p, index) => ({
  id: p.id,
  name: p.name,
  tamilName: p.tamilName,
  slug: p.slug,
  category: p.category,
  categoryName: p.categoryName,
  price: p.price,
  originalPrice: p.originalPrice,
  costPrice: Math.round(p.price * 0.55), // 45% gross margin baseline
  stock: p.stock,
  lowStockThreshold: 15,
  sku: `RS-${p.category.toUpperCase().slice(0, 3)}-${100 + index + 1}`,
  image: p.image,
  gallery: p.gallery || [p.image],
  availableSizes: p.availableSizes || [{ size: '200g', price: p.price }],
  shortDescription: p.shortDescription,
  description: p.description,
  ingredients: p.ingredients,
  allergens: p.allergens,
  storageInstructions: p.storageInstructions,
  isPublished: true,
  isFeatured: p.featured || false,
  badge: p.badge,
  unitsSold: 45 + (index * 28),
  createdAt: '2026-09-15T10:00:00Z',
  updatedAt: '2026-10-20T14:30:00Z'
}));

export const initialAdminCategories = initialStoreCategories.map((c) => ({
  id: c.id,
  name: c.name,
  slug: c.slug,
  tagline: c.tagline,
  tamilName: c.tamilName,
  description: c.description,
  image: c.image,
  productCount: c.productCount,
  isVisible: true,
  createdAt: '2026-09-01T09:00:00Z'
}));

export const initialAdminOrders = [
  {
    id: 'ORD-2026-8901',
    orderDate: '2026-10-24T08:15:00Z',
    customer: {
      id: 'CUST-101',
      name: 'Sundararajan K.',
      email: 'sundar.rajan@example.com',
      phone: '+91 98401 23456',
      address: '42 South Masi Street, Madurai, Tamil Nadu - 625001'
    },
    items: [
      {
        productId: 'madurai-special-mixture',
        name: 'Madurai Special Mixture',
        size: '400g',
        quantity: 2,
        price: 280,
        image: '/images/madurai_special_mixture.jpg'
      },
      {
        productId: 'garlic-muruku',
        name: 'Garlic Muruku',
        size: '400g',
        quantity: 1,
        price: 260,
        image: '/images/garlic_muruku.jpg'
      }
    ],
    subtotal: 820,
    shippingFee: 0,
    discountAmount: 50,
    taxAmount: 0,
    total: 770,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Confirmed',
    notes: 'Please pack in fresh festive tins if available.',
    internalNotes: 'Verified delivery address in Madurai town.',
    timeline: [
      { status: 'Pending', time: '2026-10-24T08:15:00Z', note: 'Order placed via Online Store' },
      { status: 'Confirmed', time: '2026-10-24T08:30:00Z', note: 'Payment received via GPay' }
    ]
  },
  {
    id: 'ORD-2026-8902',
    orderDate: '2026-10-23T16:40:00Z',
    customer: {
      id: 'CUST-102',
      name: 'Meenakshi Sundaram',
      email: 'meenakshi.s@example.com',
      phone: '+91 94432 87654',
      address: '15 Anna Nagar 2nd Avenue, Chennai, Tamil Nadu - 600040'
    },
    items: [
      {
        productId: 'kalyana-murukku',
        name: 'Kalyana Murukku',
        size: '500g',
        quantity: 3,
        price: 320,
        image: '/images/kalyana_murukku.jpg'
      },
      {
        productId: 'thenkuzhal-murukku',
        name: 'Thenkuzhal Murukku',
        size: '400g',
        quantity: 2,
        price: 250,
        image: '/images/thenkuzhal_murukku.jpg'
      }
    ],
    subtotal: 1460,
    shippingFee: 0,
    discountAmount: 100,
    taxAmount: 0,
    total: 1360,
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    notes: 'Handle with care — Kai murukku is fragile.',
    internalNotes: 'Double corrugated bubble lining added.',
    timeline: [
      { status: 'Pending', time: '2026-10-23T16:40:00Z', note: 'Order submitted' },
      { status: 'Confirmed', time: '2026-10-23T16:45:00Z', note: 'Card payment authorized' },
      { status: 'Processing', time: '2026-10-24T06:00:00Z', note: 'Fresh morning batch frying' }
    ]
  },
  {
    id: 'ORD-2026-8903',
    orderDate: '2026-10-23T14:10:00Z',
    customer: {
      id: 'CUST-103',
      name: 'Dr. R. Ramanathan',
      email: 'dr.ramanathan@example.com',
      phone: '+91 98840 11223',
      address: '77 Race Course Road, Coimbatore, Tamil Nadu - 641018'
    },
    items: [
      {
        productId: 'manamadurai-kara-sevu',
        name: 'Manamadurai Kara Sevu',
        size: '400g',
        quantity: 2,
        price: 270,
        image: '/images/manamadurai_kara_sevu.jpg'
      },
      {
        productId: 'arumbu-murukku',
        name: 'Arumbu Murukku',
        size: '400g',
        quantity: 2,
        price: 240,
        image: '/images/arumbu_murukku.jpg'
      }
    ],
    subtotal: 1020,
    shippingFee: 0,
    discountAmount: 0,
    taxAmount: 0,
    total: 1020,
    paymentMethod: 'NetBanking',
    paymentStatus: 'Paid',
    orderStatus: 'Packed',
    notes: 'Deliver to hospital reception during day.',
    internalNotes: 'Box sealed with security tamper tape.',
    timeline: [
      { status: 'Pending', time: '2026-10-23T14:10:00Z', note: 'Order received' },
      { status: 'Confirmed', time: '2026-10-23T14:15:00Z', note: 'Payment confirmed' },
      { status: 'Processing', time: '2026-10-23T17:00:00Z', note: 'Kitchen batch completed' },
      { status: 'Packed', time: '2026-10-24T07:30:00Z', note: 'Ready in dispatch bay' }
    ]
  },
  {
    id: 'ORD-2026-8904',
    orderDate: '2026-10-22T19:25:00Z',
    customer: {
      id: 'CUST-104',
      name: 'Ananya Krishnan',
      email: 'ananya.k@example.com',
      phone: '+91 97909 55443',
      address: 'B-404, Shanthi Park, Indiranagar, Bengaluru, Karnataka - 560038'
    },
    items: [
      {
        productId: 'garlic-muruku',
        name: 'Garlic Muruku',
        size: '200g',
        quantity: 2,
        price: 135,
        image: '/images/garlic_muruku.jpg'
      },
      {
        productId: 'katta-murukku',
        name: 'Katta Murukku',
        size: '400g',
        quantity: 1,
        price: 250,
        image: '/images/katta_murukku.jpg'
      }
    ],
    subtotal: 520,
    shippingFee: 0,
    discountAmount: 0,
    taxAmount: 0,
    total: 520,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    notes: 'Please call before delivery.',
    internalNotes: 'Tracking ID: DTDC-BLR-9921448',
    timeline: [
      { status: 'Pending', time: '2026-10-22T19:25:00Z', note: 'Order placed' },
      { status: 'Confirmed', time: '2026-10-22T19:28:00Z', note: 'Payment verified' },
      { status: 'Processing', time: '2026-10-23T08:00:00Z', note: 'Extruded & fried' },
      { status: 'Packed', time: '2026-10-23T12:00:00Z', note: 'Carton sealed' },
      { status: 'Shipped', time: '2026-10-23T16:00:00Z', note: 'Handed over to DTDC courier' }
    ]
  },
  {
    id: 'ORD-2026-8905',
    orderDate: '2026-10-21T11:05:00Z',
    customer: {
      id: 'CUST-105',
      name: 'Venkatesh Murthy',
      email: 'v.murthy@example.com',
      phone: '+91 98450 67890',
      address: '28 Gandhi Road, West Mambalam, Chennai, Tamil Nadu - 600033'
    },
    items: [
      {
        productId: 'madurai-special-mixture',
        name: 'Madurai Special Mixture',
        size: '1kg',
        quantity: 1,
        price: 670,
        image: '/images/madurai_special_mixture.jpg'
      },
      {
        productId: 'thenkuzhal-murukku',
        name: 'Thenkuzhal Murukku',
        size: '1kg',
        quantity: 1,
        price: 590,
        image: '/images/thenkuzhal_murukku.jpg'
      }
    ],
    subtotal: 1260,
    shippingFee: 0,
    discountAmount: 126,
    taxAmount: 0,
    total: 1134,
    paymentMethod: 'COD',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    notes: 'Leave at front porch security.',
    internalNotes: 'Delivered and cash collected by delivery agent.',
    timeline: [
      { status: 'Pending', time: '2026-10-21T11:05:00Z', note: 'COD order confirmed' },
      { status: 'Confirmed', time: '2026-10-21T11:30:00Z', note: 'Customer verified by phone' },
      { status: 'Processing', time: '2026-10-21T14:00:00Z', note: 'Batch packed' },
      { status: 'Shipped', time: '2026-10-22T09:00:00Z', note: 'Out for local delivery' },
      { status: 'Delivered', time: '2026-10-22T15:30:00Z', note: 'Delivered successfully' }
    ]
  },
  {
    id: 'ORD-2026-8906',
    orderDate: '2026-10-24T09:20:00Z',
    customer: {
      id: 'CUST-106',
      name: 'Karthik Subramanian',
      email: 'karthik.subbu@example.com',
      phone: '+91 99620 44332',
      address: '108 Thillai Nagar 5th Cross, Tiruchirappalli, Tamil Nadu - 620018'
    },
    items: [
      {
        productId: 'garlic-muruku',
        name: 'Garlic Muruku',
        size: '200g',
        quantity: 1,
        price: 135,
        image: '/images/garlic_muruku.jpg'
      }
    ],
    subtotal: 135,
    shippingFee: 50,
    discountAmount: 0,
    taxAmount: 0,
    total: 185,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    notes: 'Please confirm before sending.',
    internalNotes: 'Awaiting phone confirmation for first-time COD order.',
    timeline: [
      { status: 'Pending', time: '2026-10-24T09:20:00Z', note: 'Order placed' }
    ]
  },
  {
    id: 'ORD-2026-8907',
    orderDate: '2026-10-20T15:00:00Z',
    customer: {
      id: 'CUST-107',
      name: 'Sridevi Balaji',
      email: 'sridevi.b@example.com',
      phone: '+91 94440 99887',
      address: '33 Swamy Sannidhi Street, Tirunelveli, Tamil Nadu - 627006'
    },
    items: [
      {
        productId: 'manamadurai-kara-sevu',
        name: 'Manamadurai Kara Sevu',
        size: '1kg',
        quantity: 2,
        price: 650,
        image: '/images/manamadurai_kara_sevu.jpg'
      }
    ],
    subtotal: 1300,
    shippingFee: 0,
    discountAmount: 0,
    taxAmount: 0,
    total: 1300,
    paymentMethod: 'UPI',
    paymentStatus: 'Refunded',
    orderStatus: 'Cancelled',
    notes: 'Customer requested cancellation due to travel abroad.',
    internalNotes: 'Full refund of ₹1,300 processed via UPI refund ref: UPI-REF-449102.',
    timeline: [
      { status: 'Pending', time: '2026-10-20T15:00:00Z', note: 'Order placed' },
      { status: 'Confirmed', time: '2026-10-20T15:10:00Z', note: 'Payment received' },
      { status: 'Cancelled', time: '2026-10-20T17:00:00Z', note: 'Cancelled prior to dispatch' }
    ]
  }
];

export const initialAdminCustomers = [
  {
    id: 'CUST-101',
    name: 'Sundararajan K.',
    email: 'sundar.rajan@example.com',
    phone: '+91 98401 23456',
    address: '42 South Masi Street, Madurai, Tamil Nadu - 625001',
    city: 'Madurai',
    state: 'Tamil Nadu',
    pincode: '625001',
    totalOrders: 4,
    totalSpend: 3450,
    lastOrderDate: '2026-10-24T08:15:00Z',
    status: 'Active',
    notes: 'Loyal customer who prefers spicy Madurai varieties.',
    registeredDate: '2026-08-10'
  },
  {
    id: 'CUST-102',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi.s@example.com',
    phone: '+91 94432 87654',
    address: '15 Anna Nagar 2nd Avenue, Chennai, Tamil Nadu - 600040',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600040',
    totalOrders: 3,
    totalSpend: 4280,
    lastOrderDate: '2026-10-23T16:40:00Z',
    status: 'Active',
    notes: 'Regular festive Kai Murukku buyer for family functions.',
    registeredDate: '2026-08-22'
  },
  {
    id: 'CUST-103',
    name: 'Dr. R. Ramanathan',
    email: 'dr.ramanathan@example.com',
    phone: '+91 98840 11223',
    address: '77 Race Course Road, Coimbatore, Tamil Nadu - 641018',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    pincode: '641018',
    totalOrders: 2,
    totalSpend: 2150,
    lastOrderDate: '2026-10-23T14:10:00Z',
    status: 'Active',
    notes: 'Appreciates low-salt and authentic butter preparations.',
    registeredDate: '2026-09-05'
  },
  {
    id: 'CUST-104',
    name: 'Ananya Krishnan',
    email: 'ananya.k@example.com',
    phone: '+91 97909 55443',
    address: 'B-404, Shanthi Park, Indiranagar, Bengaluru, Karnataka - 560038',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    totalOrders: 5,
    totalSpend: 3980,
    lastOrderDate: '2026-10-22T19:25:00Z',
    status: 'Active',
    notes: 'Orders monthly snack hampers for Bangalore tech office tea breaks.',
    registeredDate: '2026-07-18'
  },
  {
    id: 'CUST-105',
    name: 'Venkatesh Murthy',
    email: 'v.murthy@example.com',
    phone: '+91 98450 67890',
    address: '28 Gandhi Road, West Mambalam, Chennai, Tamil Nadu - 600033',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600033',
    totalOrders: 6,
    totalSpend: 6850,
    lastOrderDate: '2026-10-21T11:05:00Z',
    status: 'VIP',
    notes: 'High-value customer; buys 1kg packs regularly.',
    registeredDate: '2026-06-30'
  },
  {
    id: 'CUST-106',
    name: 'Karthik Subramanian',
    email: 'karthik.subbu@example.com',
    phone: '+91 99620 44332',
    address: '108 Thillai Nagar 5th Cross, Tiruchirappalli, Tamil Nadu - 620018',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    pincode: '620018',
    totalOrders: 1,
    totalSpend: 185,
    lastOrderDate: '2026-10-24T09:20:00Z',
    status: 'New',
    notes: 'First order placed on COD.',
    registeredDate: '2026-10-24'
  },
  {
    id: 'CUST-107',
    name: 'Sridevi Balaji',
    email: 'sridevi.b@example.com',
    phone: '+91 94440 99887',
    address: '33 Swamy Sannidhi Street, Tirunelveli, Tamil Nadu - 627006',
    city: 'Tirunelveli',
    state: 'Tamil Nadu',
    pincode: '627006',
    totalOrders: 2,
    totalSpend: 2450,
    lastOrderDate: '2026-10-20T15:00:00Z',
    status: 'Active',
    notes: 'Requested refund on order 8907 due to overseas travel.',
    registeredDate: '2026-09-12'
  }
];

export const initialAdminInvoices = [
  {
    id: 'INV-2026-001',
    orderId: 'ORD-2026-8905',
    invoiceDate: '2026-10-21T11:35:00Z',
    customer: {
      name: 'Venkatesh Murthy',
      email: 'v.murthy@example.com',
      phone: '+91 98450 67890',
      address: '28 Gandhi Road, West Mambalam, Chennai, Tamil Nadu - 600033'
    },
    items: [
      { name: 'Madurai Special Mixture (1kg)', quantity: 1, price: 670, total: 670 },
      { name: 'Thenkuzhal Murukku (1kg)', quantity: 1, price: 590, total: 590 }
    ],
    subtotal: 1260,
    discount: 126,
    shipping: 0,
    tax: 0,
    grandTotal: 1134,
    paymentStatus: 'Paid',
    invoiceStatus: 'Issued'
  },
  {
    id: 'INV-2026-002',
    orderId: 'ORD-2026-8904',
    invoiceDate: '2026-10-22T19:30:00Z',
    customer: {
      name: 'Ananya Krishnan',
      email: 'ananya.k@example.com',
      phone: '+91 97909 55443',
      address: 'B-404, Shanthi Park, Indiranagar, Bengaluru, Karnataka - 560038'
    },
    items: [
      { name: 'Garlic Muruku (200g)', quantity: 2, price: 135, total: 270 },
      { name: 'Katta Murukku (400g)', quantity: 1, price: 250, total: 250 }
    ],
    subtotal: 520,
    discount: 0,
    shipping: 0,
    tax: 0,
    grandTotal: 520,
    paymentStatus: 'Paid',
    invoiceStatus: 'Issued'
  },
  {
    id: 'INV-2026-003',
    orderId: 'ORD-2026-8902',
    invoiceDate: '2026-10-23T16:50:00Z',
    customer: {
      name: 'Meenakshi Sundaram',
      email: 'meenakshi.s@example.com',
      phone: '+91 94432 87654',
      address: '15 Anna Nagar 2nd Avenue, Chennai, Tamil Nadu - 600040'
    },
    items: [
      { name: 'Kalyana Murukku (500g)', quantity: 3, price: 320, total: 960 },
      { name: 'Thenkuzhal Murukku (400g)', quantity: 2, price: 250, total: 500 }
    ],
    subtotal: 1460,
    discount: 100,
    shipping: 0,
    tax: 0,
    grandTotal: 1360,
    paymentStatus: 'Paid',
    invoiceStatus: 'Issued'
  }
];

export const initialAdminBanners = [
  {
    id: 'BAN-101',
    name: 'Festival Festive Assortment Promo',
    headline: 'Festive Snack Assortment',
    description: 'A curated ensemble of our five signature hand-crafted murukkus, spicy mixture, and crunchy kara sevu.',
    ctaText: 'Explore the Collection',
    ctaLink: '/shop',
    image: '/images/promo_banner.jpg',
    placement: 'homepage_promo',
    startDate: '2026-10-01',
    endDate: '2026-11-15',
    status: 'Active'
  },
  {
    id: 'BAN-102',
    name: 'Hero Seasonal Heritage Coils',
    headline: 'Crunch Into Tradition.',
    description: 'Experience the timeless joy of South Indian snacking handcrafted in small batches using pure ingredients.',
    ctaText: 'Shop All Snacks',
    ctaLink: '/shop',
    image: '/images/hero_snack_spread.jpg',
    placement: 'homepage_hero',
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    status: 'Active'
  },
  {
    id: 'BAN-103',
    name: 'Diwali Seer Special Gift Tin',
    headline: 'Grand Kalyana Murukku Gift Pack',
    description: 'Ceremonial hand-twisted concentric kai murukku packaged in gold-embossed keepsake tins.',
    ctaText: 'Pre-order Gift Tins',
    ctaLink: '/product/kalyana-murukku',
    image: '/images/kalyana_murukku.jpg',
    placement: 'category_murukku',
    startDate: '2026-10-15',
    endDate: '2026-11-20',
    status: 'Active'
  }
];

export const initialAdminCoupons = [
  {
    id: 'CPN-1',
    code: 'FESTIVE50',
    discountType: 'percentage', // 'percentage' | 'fixed'
    discountValue: 10,
    minOrderAmount: 499,
    maxDiscount: 100,
    startDate: '2026-10-01',
    endDate: '2026-11-30',
    usageLimit: 200,
    usageCount: 42,
    applicableCategory: 'all',
    status: 'Active'
  },
  {
    id: 'CPN-2',
    code: 'WELCOME100',
    discountType: 'fixed',
    discountValue: 100,
    minOrderAmount: 999,
    maxDiscount: 100,
    startDate: '2026-09-01',
    endDate: '2026-12-31',
    usageLimit: 500,
    usageCount: 118,
    applicableCategory: 'all',
    status: 'Active'
  },
  {
    id: 'CPN-3',
    code: 'MIXTURE20',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 399,
    maxDiscount: 75,
    startDate: '2026-10-15',
    endDate: '2026-10-31',
    usageLimit: 100,
    usageCount: 29,
    applicableCategory: 'mixture',
    status: 'Active'
  }
];

export const initialAdminReturns = [
  {
    id: 'RET-2026-01',
    orderId: 'ORD-2026-8907',
    customerName: 'Sridevi Balaji',
    customerEmail: 'sridevi.b@example.com',
    customerPhone: '+91 94440 99887',
    requestDate: '2026-10-20T16:00:00Z',
    reason: 'Cancellation requested before order dispatch',
    requestedAmount: 1300,
    status: 'Completed',
    resolutionNotes: 'Refund of ₹1,300 transferred back via UPI.',
    completedDate: '2026-10-20T17:30:00Z'
  },
  {
    id: 'RET-2026-02',
    orderId: 'ORD-2026-8901',
    customerName: 'Sundararajan K.',
    customerEmail: 'sundar.rajan@example.com',
    customerPhone: '+91 98401 23456',
    requestDate: '2026-10-24T09:00:00Z',
    reason: 'Customer inquired about adding one more Kara Sevu pack to confirmed order',
    requestedAmount: 0,
    status: 'Under Review',
    resolutionNotes: 'Customer service agent coordinating dispatch adjustment.',
    completedDate: null
  }
];

export const initialAdminNotifications = [
  {
    id: 'NOTIF-1',
    type: 'order',
    title: 'New Online Order Placed',
    message: 'Sundararajan K. placed order ORD-2026-8901 (₹770)',
    time: '2026-10-24T08:15:00Z',
    isRead: false,
    link: '/admin/orders'
  },
  {
    id: 'NOTIF-2',
    type: 'inventory',
    title: 'Low Stock Alert: Kalyana Murukku',
    message: 'Current stock is 15 units, reaching threshold (15)',
    time: '2026-10-23T18:00:00Z',
    isRead: false,
    link: '/admin/inventory'
  },
  {
    id: 'NOTIF-3',
    type: 'inventory',
    title: 'Stock Alert: Katta Murukku',
    message: 'Current stock is 18 units (low threshold warning)',
    time: '2026-10-23T12:00:00Z',
    isRead: true,
    link: '/admin/inventory'
  },
  {
    id: 'NOTIF-4',
    type: 'system',
    title: 'Daily Batch Log Recorded',
    message: 'Morning frying batch quality checklist approved for all 7 recipes',
    time: '2026-10-23T07:00:00Z',
    isRead: true,
    link: '/admin'
  }
];

export const initialAdminSettings = {
  storeName: 'RAJI SNACKS',
  tagline: 'Traditional Crunch, Made for Every Moment.',
  supportEmail: 'hello@rajisnacks.com',
  supportPhone: '+91 (0) 44 2845 0000',
  address: 'Traditional Snack Studio, Chennai, Tamil Nadu, India',
  currency: 'INR',
  currencySymbol: '₹',
  timeZone: 'Asia/Kolkata (IST)',
  gstin: '33AABCR1234F1Z8', // Mock demonstration GST number
  invoicePrefix: 'INV-2026-',
  freeShippingThreshold: 499,
  defaultShippingFee: 50,
  defaultLowStockThreshold: 15,
  themeMode: 'Golden Harvest Light'
};

export const initialAdminActivityLogs = [
  { id: 'ACT-1', time: '2026-10-24T08:30:00Z', event: 'Order ORD-2026-8901 confirmed by system' },
  { id: 'ACT-2', time: '2026-10-24T07:30:00Z', event: 'Order ORD-2026-8903 packed and ready for dispatch' },
  { id: 'ACT-3', time: '2026-10-23T16:50:00Z', event: 'Invoice INV-2026-003 generated for Meenakshi Sundaram' },
  { id: 'ACT-4', time: '2026-10-23T16:00:00Z', event: 'Order ORD-2026-8904 handed to DTDC courier' },
  { id: 'ACT-5', time: '2026-10-22T15:30:00Z', event: 'Order ORD-2026-8905 delivered successfully' }
];

export const initialInventoryLogs = [
  {
    id: 'ADJ-101',
    productId: 'kalyana-murukku',
    productName: 'Kalyana Murukku',
    prevStock: 25,
    change: -10,
    newStock: 15,
    reason: 'Online Orders Fulfilment (ORD-8902 & walk-in)',
    timestamp: '2026-10-23T17:00:00Z'
  },
  {
    id: 'ADJ-102',
    productId: 'garlic-muruku',
    productName: 'Garlic Muruku',
    prevStock: 15,
    change: 15,
    newStock: 30,
    reason: 'Morning Fresh Kettle Batch Inward',
    timestamp: '2026-10-23T06:30:00Z'
  },
  {
    id: 'ADJ-103',
    productId: 'madurai-special-mixture',
    productName: 'Madurai Special Mixture',
    prevStock: 30,
    change: 15,
    newStock: 45,
    reason: 'Fresh Roasted Batch Mixing',
    timestamp: '2026-10-22T08:00:00Z'
  }
];
