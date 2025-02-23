import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';

function FilterableProductsTable() {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setinStockOnly] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false); // State to toggle modal

  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name);
      }
      return a.category.localeCompare(b.category);
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem('products');
    if (!storedData) {
      const defaultProducts = [
        { category: 'Fruits', price: '$1', stocked: false, name: 'Apple' },
        { category: 'Fruits', price: '$1', stocked: false, name: 'Dragonfruit' },
        { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
        { category: 'Vegetables', price: '$2', stocked: false, name: 'Spinach' },
        { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
        { category: 'Vegetables', price: '$1', stocked: false, name: 'Peas' },
        { category: 'Fruits', price: '$3', stocked: false, name: 'Banana' },
        { category: 'Dairy', price: '$4', stocked: true, name: 'Milk' },
        { category: 'Fruits', price: '$8', stocked: true, name: 'Blueberry' },
        { category: 'Fruits', price: '$7', stocked: true, name: 'Strawberry' }
      ];
      const sortedProducts = sortProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(sortedProducts));
      setStoredProducts(sortedProducts);
    } else {
      const parsedProducts = JSON.parse(storedData);
      const sortedProducts = sortProducts(parsedProducts);
      setStoredProducts(sortedProducts);
    }
  }, []);

  useEffect(() => {
    if (storedProducts.length > 0) {
      localStorage.setItem('products', JSON.stringify(storedProducts));
    }
  }, [storedProducts]);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...storedProducts, newProduct];
    const sortedUpdatedProducts = sortProducts(updatedProducts);
    setStoredProducts(sortedUpdatedProducts);
    setShowAddProductModal(false); // Close the modal after adding
  };

  const handleDelete = (productName) => {
    const updatedProducts = storedProducts.filter(product => product.name !== productName);
    const sortedUpdatedProducts = sortProducts(updatedProducts);
    setStoredProducts(sortedUpdatedProducts);
    localStorage.setItem('products', JSON.stringify(sortedUpdatedProducts));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setinStockOnly={setinStockOnly}
      />

      <ProductTable
        products={storedProducts}
        filterText={filterText}
        inStockOnly={inStockOnly}
        onDelete={handleDelete}
      />

      {/* Button to open the Add Product modal */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddProductModal(true)}
      >
        Add Product
      </button>

      {/* Conditional rendering for the modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add a New Product</h2>
            <AddProduct onAddProduct={handleAddProduct} />
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
              onClick={() => setShowAddProductModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterableProductsTable;
