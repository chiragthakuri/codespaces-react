// src/components/ProductCategoryRow.js
import React from 'react';

function ProductCategoryRow({ category }) {
  console.log("Rendering category:", category); // Log category to ensure it's being passed correctly
  return (
    <tr>
      <th colSpan="3" className="bg-gray-200 text-center py-2 px-4 text-lg font-semibold">
        {category}
      </th>
    </tr>
  );
}

export default ProductCategoryRow;
