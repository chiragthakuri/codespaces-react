import { useState } from 'react';

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

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2" className="bg-gray-200 text-left py-2 px-4 text-lg font-semibold">
        {category}
      </th>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  const filteredProducts = products.filter(product => {
    const isInStock = inStockOnly ? product.stocked : true;
    const matchesSearch = product.name.toLowerCase().includes(filterText.toLowerCase());
    return isInStock && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No products found</div>
    );
  }

  filteredProducts.forEach(product => {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
    }

    rows.push(<ProductRow key={product.name} product={product} />);
    lastCategory = product.category;
  });

  return (
    <table className="min-w-full table-auto border-collapse mt-6">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
          <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, setFilterText, inStockOnly, setinStockOnly }) {
  return (
    <form className="mb-6">
      <input
        type="text"
        value={filterText}
        placeholder="Search products"
        onChange={e => setFilterText(e.target.value)}
        className="border px-3 py-2 rounded-md w-full max-w-xs"
      />

      <div>
        <label className="inline-flex items-center mt-2">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={e => setinStockOnly(e.target.checked)}
            className="mr-2"
          />
          Only show products in stock
        </label>
      </div>
    </form>
  );
}

function FilterableProductsTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setinStockOnly] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setinStockOnly={setinStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: false, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: false, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: false, name: 'Peas' }
];

function App() {
  return <FilterableProductsTable products={PRODUCTS} />;
}

export default App;
