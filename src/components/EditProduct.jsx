import React, { useState } from 'react';

function EditProduct({ product, onUpdateProduct, onClose }) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [stocked, setStocked] = useState(product.stocked);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedProduct = { ...product, name, price, category, stocked };
    onUpdateProduct(updatedProduct);
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
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

          <label className="block">
            <input
              type="checkbox"
              checked={stocked}
              onChange={(e) => setStocked(e.target.checked)}
              className="mr-2"
            />
            In Stock
          </label>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
