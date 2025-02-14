// src/components/ProductTable.js
import React from 'react';
import ProductRow from './ProductRow';
import ProductCategoryRow from './ProductCategoryRow';

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

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
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
    }

    rows.push(<ProductRow key={product.name} product={product} />);
    lastCategory = product.category;
  });

  return (
    <table className="min-w-full table-auto border-collapse mt-6">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default ProductTable;
