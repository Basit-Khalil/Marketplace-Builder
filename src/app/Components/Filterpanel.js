// components/FilterPanel.js
import { useState } from 'react';

const FilterPanel = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState([0, 500]); // Price range [min, max]
  const [selectedBrand, setSelectedBrand] = useState('');
  const [inStock, setInStock] = useState(false);

  // Handle price range changes
  const handlePriceChange = (e) => {
    const newPriceRange = [e.target.value[0], e.target.value[1]];
    setPriceRange(newPriceRange);
    onFilterChange({ priceRange: newPriceRange, selectedBrand, inStock });
  };

  // Handle brand selection change
  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    onFilterChange({ priceRange, selectedBrand: brand, inStock });
  };

  // Handle availability toggle change
  const handleInStockChange = () => {
    const newInStock = !inStock;
    setInStock(newInStock);
    onFilterChange({ priceRange, selectedBrand, inStock: newInStock });
  };

  return (
    <div className="filter-panel">
      <h2>Filters</h2>

      {/* Price Range */}
      <div>
        <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
        />
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
        />
      </div>

      {/* Brand Selection */}
      <div>
        <label>Brand:</label>
        <select value={selectedBrand} onChange={handleBrandChange}>
          <option value="">All Brands</option>
          <option value="brandA">Brand A</option>
          <option value="brandB">Brand B</option>
          <option value="brandC">Brand C</option>
        </select>
      </div>

      {/* Availability Toggle */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={inStock}
            onChange={handleInStockChange}
          />
          In Stock Only
        </label>
      </div>
    </div>
  );
};

export default FilterPanel;
