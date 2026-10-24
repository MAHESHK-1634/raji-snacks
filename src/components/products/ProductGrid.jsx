import React from 'react';
import ProductCard from './ProductCard';
import EmptyState from '../common/EmptyState';

export const ProductGrid = ({
  products = [],
  onQuickView,
  columns = 3,
  emptyTitle = 'No snacks found',
  emptyDescription = 'Try adjusting your search or filters to discover our traditional delicacies.',
  onResetFilters
}) => {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Clear All Filters' : 'Explore All Snacks'}
        onAction={onResetFilters}
      />
    );
  }

  const columnClasses = {
    2: 'grid grid-cols-1 sm:grid-cols-2 gap-6',
    3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
    4: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
  };

  return (
    <div className={columnClasses[columns] || columnClasses[3]}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
