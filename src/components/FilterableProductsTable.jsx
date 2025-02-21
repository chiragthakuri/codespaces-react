import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

function FilterableProductsTable() {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setinStockOnly] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);

  // Initialize Appwrite Client
  const client = new Client();
  client.setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
    .setProject('67aeecbe00182ce18e7a') // Your Project ID
    .setKey('YOUR_API_KEY'); // Your API Key

  const databases = new Databases(client);
  const databaseId = '67aeecdb003a78399017'; // Your Appwrite database ID
  const collectionId = '67aeeced001a0eb11c76'; // Your Appwrite collection ID

  // Fetch products from Appwrite on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await databases.listDocuments(databaseId, collectionId);
        setStoredProducts(response.documents); // Store the products in state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Add new product to Appwrite when you need it
  const addProduct = async (product) => {
    try {
      await databases.createDocument(
        databaseId,
        collectionId,
        'unique()', // Generate a unique ID for new products
        product
      );
      setStoredProducts((prev) => [...prev, product]); // Add the new product to state
    } catch (error) {
      console.error('Error creating product in Appwrite:', error);
    }
  };

  // Optional: you can also update existing products here if necessary
  const updateProduct = async (productId, updatedProduct) => {
    try {
      await databases.updateDocument(
        databaseId,
        collectionId,
        productId, // Document ID to update
        updatedProduct // The updated product data
      );
      // Update the product in state (in a real case, you would also fetch it back or patch it)
      setStoredProducts((prev) =>
        prev.map((product) =>
          product.$id === productId ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error('Error updating product in Appwrite:', error);
    }
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
      />
      {/* Example button to add a new product */}
      <button onClick={() => addProduct({ name: 'New Apple', category: 'Fruits', price: '$2', stocked: true })}>
        Add Product
      </button>
    </div>
  );
}

export default FilterableProductsTable;
