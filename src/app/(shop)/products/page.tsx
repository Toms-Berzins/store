import React from 'react';
import { getAllProducts } from '@/lib/shopify';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';

export default async function ProductsPage() {
  // Fetch products from Shopify
  const products = await getAllProducts();
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Our Products</h1>
          <a href="#" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block">
            Browse all products<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Please check back later for our product listings.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 