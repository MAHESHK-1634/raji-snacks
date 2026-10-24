import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Upload,
  ArrowUpDown,
  Sparkles,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';
import AdminModal from '../components/common/AdminModal';
import { formatCurrency, formatDate } from '../utils/formatters';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus
  } = useAdmin();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState('all');
  const [selectedPubStatus, setSelectedPubStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(
    searchParams.get('action') === 'new'
  );
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const defaultFormData = {
    name: '',
    slug: '',
    id: '',
    category: categories[0]?.slug || 'murukku',
    shortDescription: '',
    description: '',
    price: '',
    originalPrice: '',
    costPrice: '',
    stock: 50,
    lowStockThreshold: 15,
    status: 'published',
    featured: false,
    image: '/images/hero_snack_spread.jpg',
    ingredients: 'Rice flour, urad dal, cold-pressed sesame oil, hing, salt',
    allergens: 'Sesame seeds',
    shelfLife: '90 days in airtight container',
    packSizes: [
      { size: '200g', price: 95 },
      { size: '400g', price: 180 },
      { size: '1kg', price: 420 }
    ]
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [formErrors, setFormErrors] = useState({});

  // Open modal for new product
  const handleOpenNew = () => {
    setEditingProduct(null);
    setFormData({
      ...defaultFormData,
      id: `RS-${Date.now().toString(36).toUpperCase()}`,
      category: categories[0]?.slug || 'murukku'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      slug: product.slug || '',
      id: product.id || '',
      category: product.category || 'murukku',
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      price: product.price || '',
      originalPrice: product.originalPrice || '',
      costPrice: product.costPrice || '',
      stock: product.stock ?? 50,
      lowStockThreshold: product.lowStockThreshold || 15,
      status: product.status || 'published',
      featured: product.featured || false,
      image: product.image || '/images/hero_snack_spread.jpg',
      ingredients: product.ingredients || '',
      allergens: product.allergens || '',
      shelfLife: product.shelfLife || '90 days',
      packSizes: product.packSizes || [
        { size: '200g', price: product.price || 95 }
      ]
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Handle name change and auto-generate slug
  const handleNameChange = (e) => {
    const val = e.target.value;
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: editingProduct ? prev.slug : autoSlug
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Product name is required';
    if (!formData.slug.trim()) errors.slug = 'Slug is required';
    if (!formData.price || Number(formData.price) <= 0)
      errors.price = 'Valid price is required';
    if (formData.stock < 0) errors.stock = 'Stock cannot be negative';

    // Check for duplicate ID / slug (when creating)
    if (!editingProduct) {
      if (products.some((p) => p.id === formData.id)) {
        errors.id = 'Product ID already exists';
      }
      if (products.some((p) => p.slug === formData.slug)) {
        errors.slug = 'Product slug already exists';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Save
  const handleSave = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...formData,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
      costPrice: formData.costPrice ? Number(formData.costPrice) : null,
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold) || 15
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setIsModalOpen(false);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCat =
        selectedCategory === 'all' || p.category === selectedCategory;

      // Stock
      let matchesStock = true;
      if (selectedStockStatus === 'in-stock') {
        matchesStock = p.stock > (p.lowStockThreshold || 15);
      } else if (selectedStockStatus === 'low-stock') {
        matchesStock = p.stock > 0 && p.stock <= (p.lowStockThreshold || 15);
      } else if (selectedStockStatus === 'out-of-stock') {
        matchesStock = p.stock === 0;
      }

      // Publication
      const matchesPub =
        selectedPubStatus === 'all' || p.status === selectedPubStatus;

      return matchesSearch && matchesCat && matchesStock && matchesPub;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock-asc') return a.stock - b.stock;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      return 0;
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedStockStatus,
    selectedPubStatus,
    sortBy
  ]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Product Management
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Configure snack catalogue, pack sizes, inventory thresholds and publication status
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-all shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Snack</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E8DDCB] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search Input */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
            <input
              type="text"
              placeholder="Search by snack name or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext placeholder:text-muted focus:outline-none focus:border-gold"
            />
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold capitalize"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Status Filter */}
          <div>
            <select
              value={selectedStockStatus}
              onChange={(e) => {
                setSelectedStockStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
            >
              <option value="all">All Stock Levels</option>
              <option value="in-stock">In Stock (&gt;15)</option>
              <option value="low-stock">Low Stock (≤15)</option>
              <option value="out-of-stock">Out of Stock (0)</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext focus:outline-none focus:border-gold"
            >
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="stock-desc">Stock: High to Low</option>
              <option value="stock-asc">Stock: Low to High</option>
            </select>
          </div>
        </div>

        {/* Active Filters Clear Strip */}
        {(searchQuery ||
          selectedCategory !== 'all' ||
          selectedStockStatus !== 'all' ||
          selectedPubStatus !== 'all') && (
          <div className="flex items-center justify-between pt-2 border-t border-[#E8DDCB]/50 text-xs text-muted">
            <span>
              Showing {filteredProducts.length} of {products.length} products
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedStockStatus('all');
                setSelectedPubStatus('all');
                setCurrentPage(1);
              }}
              className="text-maroon hover:underline font-medium text-xs"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warmwhite text-muted uppercase text-[10px] tracking-wider border-b border-[#E8DDCB]">
              <tr>
                <th className="py-3 px-4">Product Details</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Price</th>
                <th className="py-3 px-3">Pack Variants</th>
                <th className="py-3 px-3 text-center">Stock</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DDCB]/50">
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-muted">
                    <Package className="w-10 h-10 mx-auto text-muted/40 mb-2" />
                    <p className="font-semibold text-sm text-darktext">
                      No snack products found
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Try adjusting your search criteria or add a new snack.
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((p) => {
                  const isLow = p.stock <= (p.lowStockThreshold || 15) && p.stock > 0;
                  const isOut = p.stock === 0;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-cream/20 transition-colors"
                    >
                      {/* Product Image & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover border border-[#E8DDCB] flex-shrink-0"
                            onError={(e) => {
                              e.target.src = '/images/hero_snack_spread.jpg';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-darktext truncate max-w-[180px]">
                                {p.name}
                              </span>
                              {p.featured && (
                                <Sparkles className="w-3 h-3 text-gold flex-shrink-0" />
                              )}
                            </div>
                            <span className="text-[10px] text-muted font-mono">
                              {p.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-3">
                        <span className="capitalize text-muted font-medium">
                          {p.category}
                        </span>
                      </td>

                      {/* Base Price */}
                      <td className="py-3 px-3">
                        <span className="font-semibold text-maroon">
                          {formatCurrency(p.price)}
                        </span>
                        {p.originalPrice && (
                          <span className="text-[10px] text-muted line-through block">
                            {formatCurrency(p.originalPrice)}
                          </span>
                        )}
                      </td>

                      {/* Pack Variants */}
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {p.packSizes?.map((pack, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-warmwhite px-1.5 py-0.5 rounded border border-[#E8DDCB] text-muted font-mono"
                            >
                              {pack.size}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Stock Quantity & Badge */}
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`font-bold ${
                            isOut
                              ? 'text-red-600'
                              : isLow
                              ? 'text-amber-600'
                              : 'text-forest'
                          }`}
                        >
                          {p.stock}
                        </span>
                        <div className="mt-0.5">
                          <StatusBadge
                            status={
                              isOut
                                ? 'out-of-stock'
                                : isLow
                                ? 'low-stock'
                                : 'in-stock'
                            }
                          />
                        </div>
                      </td>

                      {/* Publication Status Toggle */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => toggleProductStatus(p.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium"
                          title="Click to toggle publication status"
                        >
                          <StatusBadge status={p.status || 'published'} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 rounded-md hover:bg-gold/15 text-muted hover:text-darktext transition-colors"
                            title="Edit Product"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-muted hover:text-red-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-3 border-t border-[#E8DDCB] bg-warmwhite/50 text-xs">
            <span className="text-muted">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-2.5 py-1 rounded border border-[#E8DDCB] bg-white disabled:opacity-40 hover:bg-cream"
              >
                Previous
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-2.5 py-1 rounded border border-[#E8DDCB] bg-white disabled:opacity-40 hover:bg-cream"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Snack Product' : 'Add New Snack Product'}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Snack Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Madurai Special Mixture"
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
              {formErrors.name && (
                <p className="text-[10px] text-red-600 mt-0.5">{formErrors.name}</p>
              )}
            </div>

            {/* URL Slug */}
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                URL Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs font-mono focus:outline-none focus:border-gold"
              />
              {formErrors.slug && (
                <p className="text-[10px] text-red-600 mt-0.5">{formErrors.slug}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs capitalize focus:outline-none focus:border-gold"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Base Selling Price */}
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                min="1"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="e.g. 120"
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
              {formErrors.price && (
                <p className="text-[10px] text-red-600 mt-0.5">{formErrors.price}</p>
              )}
            </div>

            {/* Opening Stock */}
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Current Stock (Packs) *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, stock: e.target.value }))
                }
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
              {formErrors.stock && (
                <p className="text-[10px] text-red-600 mt-0.5">{formErrors.stock}</p>
              )}
            </div>

            {/* Low-stock threshold */}
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Low Stock Threshold
              </label>
              <input
                type="number"
                min="1"
                value={formData.lowStockThreshold}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lowStockThreshold: e.target.value
                  }))
                }
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Image Path / Selection with Preview */}
          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              Primary Product Image Path
            </label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="/images/hero_snack_spread.jpg"
                className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs font-mono focus:outline-none focus:border-gold"
              />
              <img
                src={formData.image}
                alt="Preview"
                className="w-9 h-9 rounded-lg object-cover border border-[#E8DDCB] flex-shrink-0"
                onError={(e) => {
                  e.target.src = '/images/hero_snack_spread.jpg';
                }}
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              Short Description
            </label>
            <input
              type="text"
              value={formData.shortDescription}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  shortDescription: e.target.value
                }))
              }
              placeholder="Crisp, handmade South Indian savoury made with traditional spices"
              className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
            />
          </div>

          {/* Full Ingredients & Storage Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Ingredients
              </label>
              <input
                type="text"
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ingredients: e.target.value
                  }))
                }
                placeholder="Rice flour, spices, sesame oil"
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-darktext mb-1">
                Shelf Life
              </label>
              <input
                type="text"
                value={formData.shelfLife}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    shelfLife: e.target.value
                  }))
                }
                className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          {/* Status & Featured Toggle */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-warmwhite border border-[#E8DDCB]">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-darktext">
                <input
                  type="checkbox"
                  checked={formData.status === 'published'}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.checked ? 'published' : 'draft'
                    }))
                  }
                  className="rounded text-maroon focus:ring-maroon"
                />
                <span>Published on Store</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-darktext">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: e.target.checked
                    }))
                  }
                  className="rounded text-maroon focus:ring-maroon"
                />
                <span>Featured Product</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DDCB]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-[#E8DDCB] text-xs font-semibold text-darktext hover:bg-cream transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-colors shadow-xs"
            >
              {editingProduct ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Delete Confirmation Dialog */}
      <AdminModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Confirm Deletion"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-muted">
            Are you sure you want to delete this snack product? This will remove it from the catalogue and inventory tracking.
          </p>
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DDCB]">
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs font-semibold text-darktext hover:bg-cream"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteProduct(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 shadow-xs"
            >
              Delete Snack
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
