import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

function FilterableProductsTable() {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [storedProducts, setStoredProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const sortProducts = (products) => {
    return products.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('products');
    if (storedData) {
      setStoredProducts(sortProducts(JSON.parse(storedData)));
    }
  }, []);

  useEffect(() => {
    if (storedProducts.length > 0) {
      localStorage.setItem('products', JSON.stringify(storedProducts));
    }
  }, [storedProducts]);

  const handleAddProduct = (newProduct) => {
    setStoredProducts(sortProducts([...storedProducts, newProduct]));
    setShowAddProductModal(false);
  };

  const handleDelete = (productName) => {
    setStoredProducts(sortProducts(storedProducts.filter(product => product.name !== productName)));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setStoredProducts(
      sortProducts(storedProducts.map((p) => (p.name === updatedProduct.name ? updatedProduct : p)))
    );
    setEditingProduct(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setInStockOnly={setInStockOnly}
      />

      <ProductTable
        products={storedProducts}
        filterText={filterText}
        inStockOnly={inStockOnly}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowAddProductModal(true)}
      >
        Add Product
      </button>

      {showAddProductModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add a New Product</h2>
            <AddProduct onAddProduct={handleAddProduct} />
            <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={() => setShowAddProductModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onUpdateProduct={handleUpdateProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default FilterableProductsTable;
