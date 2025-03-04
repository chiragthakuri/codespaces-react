// src/components/ProductTable.js
import React from 'react';
import ProductRow from './ProductRow';
import ProductCategoryRow from './ProductCategoryRow';

function ProductTable({ products, filterText, inStockOnly, onDelete }) {
  const rows = [];
  const categories = new Set();

  const filteredProducts = products.filter(product => {
    const isInStock = inStockOnly ? product.stocked : true;
    const matchesSearch = product.name.toLowerCase().includes(filterText.toLowerCase());
    return isInStock && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No products found</div>
    );
  }

  filteredProducts.forEach(product => {
    if (!categories.has(product.category)) {
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
      categories.add(product.category);
    }

    rows.push(<ProductRow key={product.name} product={product} onDelete={onDelete} onEdit={onEdit} />);
    
  });

  return (
    <table className="min-w-full table-auto border-collapse mt-6">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
        
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default ProductTable;
