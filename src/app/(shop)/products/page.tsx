'use client';

import React, { useState, useEffect } from 'react';
import { getAllProducts } from '@/lib/shopify';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

interface ExtendedProduct extends Product {
  price: string;
  category?: string;
  materials?: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ExtendedProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ExtendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    price: '',
    material: ''
  });
  const [tempFilters, setTempFilters] = useState(filters);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Format price for display
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsData = await getAllProducts();
        
        // Add mock category and material data for demo
        const enhancedProducts = productsData.map((product: Product) => ({
          ...product,
          category: ['Home Decor', 'Gadgets', 'Art', 'Utility'][Math.floor(Math.random() * 4)],
          materials: [
            ['PLA', 'ABS', 'PETG'][Math.floor(Math.random() * 3)],
            ['White', 'Black', 'Blue', 'Red', 'Green'][Math.floor(Math.random() * 5)]
          ]
        }));
        
        setProducts(enhancedProducts);
        setFilteredProducts(enhancedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Check if any filters are active
    const hasFilters = Object.values(filters).some(value => value !== '');
    setHasActiveFilters(hasFilters);
  }, [filters]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    // Update both tempFilters and filters immediately
    setTempFilters(prev => ({ ...prev, [key]: value }));
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    // Apply tempFilters to main filters
    setFilters(tempFilters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const emptyFilters = {
      search: '',
      category: '',
      price: '',
      material: ''
    };
    setFilters(emptyFilters);
    setTempFilters(emptyFilters);
    setHasActiveFilters(false);
    setFilteredProducts(products);
    setIsFilterOpen(false);
  };

  // Helper function to parse price string to number
  const parsePrice = (priceStr: string | number): number | null => {
    if (!priceStr) return null;
    // Remove currency symbol, commas and any other non-numeric characters except decimal point
    const cleanPrice = priceStr.toString().replace(/[^0-9.,]/g, '').replace(',', '.');
    const price = parseFloat(cleanPrice);
    return isNaN(price) ? null : price;
  };

  // Filter products whenever filters change
  useEffect(() => {
    let filtered = [...products];
    
    if (filters.search) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category);
    }
    
    if (filters.price) {
      filtered = filtered.filter(product => {
        const price = parsePrice(product.priceRange.minVariantPrice.amount);
        if (price === null) return false;

        // Handle specific price ranges
        switch (filters.price) {
          case '0-25':
            return price > 0 && price <= 25;
          case '25-50':
            return price > 25 && price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case '100-999999':
            return price > 100;
          default:
            return true;
        }
      });
    }
    
    if (filters.material) {
      filtered = filtered.filter(product => 
        product.materials?.some(material => material === filters.material)
      );
    }
    
    setFilteredProducts(filtered);
  }, [filters, products]);

  // Update tempFilters when filters change
  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Discover Our Products
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore our collection of high-quality 3D printed products
          </p>
        </motion.div>

        <div className="mt-6 flex flex-col gap-6">
          {/* Filter and view controls */}
          <div className="w-full">
            <div className="flex flex-col gap-4">
              {/* Primary filters - horizontal */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <input
                    id="search"
                    type="text"
                    value={tempFilters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                    placeholder="Search products..."
                  />
                </div>
                <div className="w-[200px]">
                  <select
                    id="category"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="">All Categories</option>
                    <option value="Utility">Utility</option>
                    <option value="Gadgets">Gadgets</option>
                    <option value="Art">Art</option>
                  </select>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`p-2 rounded-md flex items-center space-x-2 transition-colors relative group ${
                      hasActiveFilters 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-label="More filters"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      More Filters
                    </div>
                  </button>

                  <div className={`absolute left-1/2 -translate-x-1/2 mt-2 w-80 rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 ease-in-out transform origin-top ${
                    isFilterOpen 
                      ? 'opacity-100 scale-100 translate-y-0' 
                      : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                  }`}>
                    <div className="relative">
                      {/* Frosted glass backdrop */}
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-md border border-white/20" />
                      
                      {/* Content */}
                      <div className="relative p-4 pr-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-semibold text-gray-900">Additional Filters</h3>
                          <button
                            onClick={() => setIsFilterOpen(false)}
                            className="text-gray-400 hover:text-gray-500 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                            <select
                              id="price"
                              value={filters.price}
                              onChange={(e) => handleFilterChange('price', e.target.value)}
                              className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                            >
                              <option value="">All Prices</option>
                              <option value="0-25">Under {formatPrice(25)}</option>
                              <option value="25-50">{formatPrice(25)} - {formatPrice(50)}</option>
                              <option value="50-100">{formatPrice(50)} - {formatPrice(100)}</option>
                              <option value="100-999999">Over {formatPrice(100)}</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                            <select
                              id="material"
                              value={filters.material}
                              onChange={(e) => handleFilterChange('material', e.target.value)}
                              className="w-full px-3 py-2 bg-white/50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                            >
                              <option value="">All Materials</option>
                              <option value="PETG">PETG</option>
                              <option value="Black">Black</option>
                              <option value="ABS">ABS</option>
                              <option value="White">White</option>
                            </select>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={resetFilters}
                              className="flex-1 bg-white/80 hover:bg-white/90 text-gray-800 font-medium py-2 px-4 rounded-md transition-all duration-200 backdrop-blur-sm border border-gray-200 shadow-sm hover:shadow-md"
                            >
                              Reset Filters
                            </button>
                            <button
                              onClick={applyFilters}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              Apply Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 relative group ${
                      viewMode === 'grid' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Grid View
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 relative group ${
                      viewMode === 'list' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      List View
                    </div>
                  </button>
                </div>
              </div>

              {/* Results count and view toggle */}
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="w-full">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr' 
                : 'grid-cols-1'
            }`}>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                filteredProducts.map((product: ExtendedProduct, index: number) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))
              )}
            </div>
            
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-gray-50 rounded-lg"
              >
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters to find what you&apos;re looking for.
                </p>
                <div className="mt-6">
                  <button
                    onClick={resetFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 