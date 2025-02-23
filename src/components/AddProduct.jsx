// src/components/AddProduct.js
import React, { useState } from 'react';

function AddProduct({ onAddProduct }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(''); // Make sure category is a state
  const [stocked, setStocked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!category) {
      alert("Please select a category");
      return; // Prevent form submission if category is empty
    }

    // Log the current values before adding
    console.log("Adding product:", { name, price, category, stocked });
    
    // Create new product object
    const newProduct = { name, price, category, stocked };
    
    // Call onAddProduct prop to update the list in parent component
    onAddProduct(newProduct);
    
    // Reset form fields
    setName('');
    setPrice('');
    setCategory('');
    setStocked(false);
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
        <option value="">Select Category</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Dairy">Dairy</option>
        {/* Add more categories if needed */}
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
        Add Product
      </button>
    </form>
  );
}

export default AddProduct;
