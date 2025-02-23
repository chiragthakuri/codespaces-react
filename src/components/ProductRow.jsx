// src/components/ProductRow.js
import React from 'react';

function ProductRow({ product, onDelete }) {
  return (
    <tr className="border-t hover:bg-gray-50">
      <td className={`py-2 px-4 ${product.stocked ? 'text-black' : 'text-red-500'}`}>
        {product.name}
      </td>
      <td className="py-2 px-4">{product.price}</td>
      <td className="py-2 px-4">
        <button
          onClick={() => onDelete(product.name)} // Trigger delete on click
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
