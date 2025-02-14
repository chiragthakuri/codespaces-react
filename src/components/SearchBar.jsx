// src/components/SearchBar.js
import React from 'react';

function SearchBar({ filterText, setFilterText, inStockOnly, setinStockOnly }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search products"
        onChange={e => setFilterText(e.target.value)}
        className="border px-3 py-2 mb-2 rounded-md w-full max-w-xs"
      />

      <div>
        <label className="items-center mt-2">
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

export default SearchBar;
