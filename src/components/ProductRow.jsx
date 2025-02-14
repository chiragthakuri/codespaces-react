// src/components/ProductRow.js
import React from 'react';

function ProductRow({ product }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className={`py-2 px-4 ${product.stocked ? 'text-black' : 'text-red-500'}`}>
        {product.name}
      </td>
      <td className="py-2 px-4">{product.price}</td>
    </tr>
  );
}

export default ProductRow;
