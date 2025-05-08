'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductVariant } from '@/types/product';
import ProductModelViewer from './ProductModelViewer';
import { useCart } from '@/lib/contexts/CartContext';

interface ProductDetailsProps {
  product: Product;
  modelUrl?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, modelUrl }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);
  
  // Get variants from product
  const variants = product.variants?.edges.map(edge => edge.node) || [];
  const selectedVariant = variants[selectedVariantIndex] || variants[0];
  
  // Format the price
  const price = parseFloat(selectedVariant?.price?.amount || product.priceRange.minVariantPrice.amount);
  const currency = selectedVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
  
  // Get the first image or use a placeholder
  const images = product.images.edges.map(edge => edge.node);
  const mainImage = images[0] || null;
  const mainImageUrl = mainImage?.url || '/placeholder-product.jpg';
  const mainImageAlt = mainImage?.altText || product.title;
  
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(product, selectedVariant, quantity);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(q => q + 1);
  };
  
  const decrementQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product image/3D model section */}
        <div className="relative">
          {/* Toggle between image and 3D model */}
          {modelUrl && (
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setShowModel(!showModel)}
                className="bg-white shadow-md rounded-full p-2 text-sm font-medium"
              >
                {showModel ? 'View Photo' : 'View 3D Model'}
              </button>
            </div>
          )}
          
          {/* 3D model viewer */}
          {showModel && modelUrl ? (
            <div className="aspect-square h-full">
              <ProductModelViewer 
                modelUrl={modelUrl} 
                className="h-full"
              />
            </div>
          ) : (
            /* Product image */
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <Image
                src={mainImageUrl}
                alt={mainImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          )}
          
          {/* Thumbnail images */}
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.slice(0, 4).map((image, index) => (
                <button 
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  onClick={() => setShowModel(false)}
                >
                  <Image
                    src={image.url}
                    alt={image.altText || `Product image ${index + 1}`}
                    fill
                    sizes="25vw"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="mt-10 lg:mt-0 lg:pl-8">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-4 text-xl text-gray-900">{formattedPrice}</p>
          
          {/* Product description */}
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div 
              className="text-base text-gray-700 space-y-4"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
          
          {/* Variants */}
          {variants.length > 1 && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Options</h3>
              <div className="mt-2">
                <div className="flex flex-wrap gap-2">
                  {variants.map((variant, index) => (
                    <button
                      key={variant.id}
                      className={`
                        border rounded-md py-2 px-4 text-sm font-medium
                        ${selectedVariantIndex === index 
                          ? 'border-blue-500 bg-blue-50 text-blue-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'}
                      `}
                      onClick={() => setSelectedVariantIndex(index)}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Quantity selector */}
          <div className="mt-8">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900 mr-4">Quantity</h3>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={decrementQuantity}
                >
                  <span className="sr-only">Decrease</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="px-4 py-2 text-center text-gray-900 min-w-[3rem]">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={incrementQuantity}
                >
                  <span className="sr-only">Increase</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Add to cart button */}
          <div className="mt-8">
            <button
              type="button"
              className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
          
          {/* Additional product details */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-lg font-medium text-gray-900">Details</h3>
            <div className="mt-4 prose prose-sm text-gray-500">
              <ul className="list-disc pl-4">
                <li>3D printed with high-quality materials</li>
                <li>Made to order</li>
                <li>EU compliant materials</li>
                <li>Dispatched within 3-5 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 