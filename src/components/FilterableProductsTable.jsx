// src/components/FilterableProductsTable.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';

function FilterableProductsTable() {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setinStockOnly] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);

  // On component mount, check if products are already in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('products');
    if (!storedData) {
      const defaultProducts = [
        { category: 'Fruits', price: '$1', stocked: false, name: 'Apple' },
        { category: 'Fruits', price: '$1', stocked: false, name: 'Dragonfruit' },
        { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
        { category: 'Vegetables', price: '$2', stocked: false, name: 'Spinach' },
        { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
        { category: 'Vegetables', price: '$1', stocked: false, name: 'Peas' }
      ];
      localStorage.setItem('products', JSON.stringify(defaultProducts));
      setStoredProducts(defaultProducts);
    } else {
      setStoredProducts(JSON.parse(storedData));
    }
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Update localStorage whenever storedProducts change
  useEffect(() => {
    if (storedProducts.length > 0) {
      localStorage.setItem('products', JSON.stringify(storedProducts));
    }
  }, [storedProducts]);

    // Handle adding a product
    const handleAddProduct = (newProduct) => {
      const updatedProducts = [...storedProducts, newProduct];
      setStoredProducts(updatedProducts);
    };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setinStockOnly={setinStockOnly}
      />

      {/* Pass handleAddProduct to AddProductForm */}
      <AddProduct onAddProduct={handleAddProduct} />

      <ProductTable
        products={storedProducts}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

export default FilterableProductsTable;
