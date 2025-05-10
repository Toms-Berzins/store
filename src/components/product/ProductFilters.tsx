'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';

type FilterOptions = {
  categories: string[];
  priceRanges: {
    min: number;
    max: number;
    label: string;
  }[];
  materials: string[];
};

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  products,
  onFilterChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    priceRanges: [
      { min: 0, max: 25, label: 'Under €25' },
      { min: 25, max: 50, label: '€25 - €50' },
      { min: 50, max: 100, label: '€50 - €100' },
      { min: 100, max: 999999, label: 'Over €100' },
    ],
    materials: [],
  });

  // Extract filter options from products
  useEffect(() => {
    if (!products?.length) return;

    const categories = Array.from(new Set(products.map(p => p.category || 'Uncategorized')));
    const materials = Array.from(new Set(products.flatMap(p => p.materials || [])));

    setFilterOptions(prev => ({
      ...prev,
      categories,
      materials,
    }));
  }, [products]);

  // Apply filters when any filter changes
  useEffect(() => {
    if (!products?.length) return;

    let filteredProducts = [...products];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.title.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(p => 
        p.category === selectedCategory
      );
    }

    // Apply price filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(p => {
        const price = parseFloat(p.priceRange.minVariantPrice.amount);
        return price >= min && price <= max;
      });
    }

    // Apply material filter
    if (selectedMaterial) {
      filteredProducts = filteredProducts.filter(p => 
        p.materials?.includes(selectedMaterial)
      );
    }

    onFilterChange(filteredProducts);
  }, [searchTerm, selectedCategory, selectedPriceRange, selectedMaterial, products, onFilterChange]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
      
      {/* Search input */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          id="search"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {filterOptions.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price range filter */}
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <select
          id="price"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          <option value="">All Prices</option>
          {filterOptions.priceRanges.map((range) => (
            <option key={range.label} value={`${range.min}-${range.max}`}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Material filter */}
      <div className="mb-4">
        <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">
          Material
        </label>
        <select
          id="material"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
        >
          <option value="">All Materials</option>
          {filterOptions.materials.map((material) => (
            <option key={material} value={material}>
              {material}
            </option>
          ))}
        </select>
      </div>

      {/* Reset filters button */}
      <button
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-150"
        onClick={() => {
          setSearchTerm('');
          setSelectedCategory('');
          setSelectedPriceRange('');
          setSelectedMaterial('');
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilters; 