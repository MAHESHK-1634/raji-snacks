import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Layers,
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  Eye,
  EyeOff,
  AlertCircle,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import StatusBadge from '../components/common/StatusBadge';
import AdminModal from '../components/common/AdminModal';
import { formatDate } from '../utils/formatters';

export default function Categories() {
  const [searchParams] = useSearchParams();
  const {
    categories,
    products,
    addCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryVisibility
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(
    searchParams.get('action') === 'new'
  );
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteWarning, setDeleteWarning] = useState(null); // stores { category, productCount }

  // Form state
  const defaultForm = {
    name: '',
    slug: '',
    description: '',
    image: '/images/hero_snack_spread.jpg',
    visible: true
  };
  const [formData, setFormData] = useState(defaultForm);
  const [formErrors, setFormErrors] = useState({});

  // Dynamic product counts for each category
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat.slug] = products.filter((p) => p.category === cat.slug).length;
    return acc;
  }, {});

  const handleOpenNew = () => {
    setEditingCategory(null);
    setFormData(defaultForm);
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      image: category.image || '/images/hero_snack_spread.jpg',
      visible: category.visible !== false
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

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
      slug: editingCategory ? prev.slug : autoSlug
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Category name is required';
    if (!formData.slug.trim()) errors.slug = 'Category slug is required';

    // Duplicate check
    const duplicate = categories.find(
      (c) =>
        (!editingCategory || c.id !== editingCategory.id) &&
        (c.slug === formData.slug ||
          c.name.toLowerCase() === formData.name.toLowerCase().trim())
    );
    if (duplicate) {
      errors.slug = 'A category with this name or slug already exists';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (category) => {
    const attachedCount = categoryCounts[category.slug] || 0;
    if (attachedCount > 0) {
      setDeleteWarning({ category, count: attachedCount });
    } else {
      if (
        window.confirm(
          `Are you sure you want to delete category "${category.name}"?`
        )
      ) {
        deleteCategory(category.id);
      }
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E8DDCB]/60">
        <div>
          <h1 className="text-2xl font-serif font-bold text-darktext">
            Category Management
          </h1>
          <p className="text-xs text-muted mt-0.5">
            Organize South Indian savoury categories, visibility, and catalogue grouping
          </p>
        </div>
        <button
          onClick={handleOpenNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark transition-all shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl p-4 border border-[#E8DDCB] shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted" />
          <input
            type="text"
            placeholder="Search categories by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-warmwhite border border-[#E8DDCB] text-xs text-darktext placeholder:text-muted focus:outline-none focus:border-gold"
          />
        </div>
        <span className="text-xs text-muted hidden sm:inline">
          {filteredCategories.length} Categories configured
        </span>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((category) => {
          const productCount = categoryCounts[category.slug] || 0;
          return (
            <div
              key={category.id}
              className="bg-white rounded-xl border border-[#E8DDCB] overflow-hidden shadow-xs hover:border-gold/50 transition-all flex flex-col"
            >
              {/* Category Image Header */}
              <div className="h-36 w-full relative overflow-hidden bg-cream">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/hero_snack_spread.jpg';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-black/60 text-white backdrop-blur-xs">
                    {category.slug}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleCategoryVisibility(category.id)}
                    className="p-1.5 rounded-full bg-white/90 text-darktext hover:bg-white shadow-xs transition-colors"
                    title={
                      category.visible ? 'Hide from store' : 'Show on store'
                    }
                  >
                    {category.visible ? (
                      <Eye className="w-3.5 h-3.5 text-forest" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-muted" />
                    )}
                  </button>
                </div>
              </div>

              {/* Category Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif font-bold text-base text-darktext">
                      {category.name}
                    </h3>
                    <StatusBadge
                      status={category.visible ? 'published' : 'draft'}
                    />
                  </div>
                  <p className="text-xs text-muted line-clamp-2 mb-3">
                    {category.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DDCB]/60 flex items-center justify-between">
                  <Link
                    to={`/admin/products?category=${category.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs text-maroon hover:underline font-semibold"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>{productCount} Snack Items</span>
                  </Link>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(category)}
                      className="p-1.5 rounded hover:bg-gold/15 text-muted hover:text-darktext transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category)}
                      className="p-1.5 rounded hover:bg-red-50 text-muted hover:text-red-600 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Snack Category'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              placeholder="e.g. Kara Sevu"
              className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold"
            />
            {formErrors.name && (
              <p className="text-[10px] text-red-600 mt-0.5">{formErrors.name}</p>
            )}
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              Category Image Path
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                className="flex-1 px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs font-mono focus:outline-none focus:border-gold"
              />
              <img
                src={formData.image}
                alt="Preview"
                className="w-8 h-8 rounded object-cover border border-[#E8DDCB]"
                onError={(e) => {
                  e.target.src = '/images/hero_snack_spread.jpg';
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-darktext mb-1">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Traditional crispy snack crafted using authentic family recipes..."
              className="w-full px-3 py-1.5 rounded-lg border border-[#E8DDCB] text-xs focus:outline-none focus:border-gold resize-none"
            />
          </div>

          <div className="p-3 rounded-lg bg-warmwhite border border-[#E8DDCB]">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-darktext">
              <input
                type="checkbox"
                checked={formData.visible}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, visible: e.target.checked }))
                }
                className="rounded text-maroon focus:ring-maroon"
              />
              <span>Visible in Store Navigation</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E8DDCB]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-[#E8DDCB] text-xs font-semibold text-darktext hover:bg-cream"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-maroon text-white text-xs font-semibold hover:bg-maroon-dark shadow-xs"
            >
              {editingCategory ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Protected Deletion Warning Modal */}
      <AdminModal
        isOpen={Boolean(deleteWarning)}
        onClose={() => setDeleteWarning(null)}
        title="Cannot Delete Category"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <div className="text-xs">
              <p className="font-bold">
                Category "{deleteWarning?.category?.name}" currently has{' '}
                {deleteWarning?.count} active snack products attached.
              </p>
              <p className="mt-1 text-amber-700">
                To protect catalogue consistency and prevent orphaned products,
                you must reassign or remove all products in this category before
                deleting it.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E8DDCB]">
            <Link
              to={`/admin/products?category=${deleteWarning?.category?.slug}`}
              onClick={() => setDeleteWarning(null)}
              className="text-xs font-semibold text-maroon hover:underline"
            >
              View Attached Products →
            </Link>
            <button
              onClick={() => setDeleteWarning(null)}
              className="px-3 py-1.5 rounded-lg bg-darktext text-white text-xs font-semibold hover:bg-black"
            >
              Understood
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}
