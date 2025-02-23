import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';

function FilterableProductsTable() {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setinStockOnly] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);

  // Sort products by category and name for consistent order
  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (a.category === b.category) {
        return a.name.localeCompare(b.name); // Sort alphabetically by product name within category
      }
      return a.category.localeCompare(b.category); // Sort by category alphabetically
    });
  };

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
      console.log("Updated storedProducts:", storedProducts);
    }
  }, [storedProducts]);

  // Handle adding a product
  const handleAddProduct = (newProduct) => {
    console.log("Product added:", newProduct);
    const updatedProducts = [...storedProducts, newProduct];
    const sortedUpdatedProducts = sortProducts(updatedProducts);
    setStoredProducts(sortedUpdatedProducts);
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

      <AddProduct onAddProduct={handleAddProduct} />

      <ProductTable
        products={storedProducts}
        filterText={filterText}
        inStockOnly={inStockOnly}
        onDelete={handleDelete}
      />
      {/* Example button to add a new product */}
      <button onClick={() => addProduct({ name: 'New Apple', category: 'Fruits', price: '$2', stocked: true })}>
        Add Product
      </button>
    </div>
  );
}

export default FilterableProductsTable;
