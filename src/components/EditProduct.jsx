// src/components/EditProduct.js
import React, { useState } from 'react';

function EditProduct({ product, onUpdateProduct, onCancel }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [stocked, setStocked] = useState(product.stocked);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...product, name, price, category, stocked };
    onUpdateProduct(updatedProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="border px-3 py-2 rounded-md w-full"
      />
      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
        className="border px-3 py-2 rounded-md w-full"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="border px-3 py-2 rounded-md w-full"
      >
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Dairy">Dairy</option>
      </select>
      <br />
      <label>
        In Stock
        <input
          type="checkbox"
          checked={stocked}
          onChange={(e) => setStocked(e.target.checked)}
          className="ml-2"
        />
      </label>
      <br />
      <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">
        Update Product
      </button>
      <button type="button" onClick={onCancel} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded-md ml-2">
        Cancel
      </button>
    </form>
  );
}

export default EditProduct;