'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import AddToCartButton from '@/components/AddToCartButton';
import { useCart } from '@/lib/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { handle, title, images, priceRange, variants, description } = product;
  const { addToCart } = useCart();
  
  // Get the first image or use a placeholder
  const imageData = images.edges[0]?.node || null;
  const imageUrl = imageData?.url || '/placeholder-product.jpg';
  const imageAlt = imageData?.altText || title;
  
  // Format the price
  const price = parseFloat(priceRange.minVariantPrice.amount);
  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  // Get the default variant (first variant)
  const defaultVariant = variants?.edges[0]?.node;
  
  const handleAddToCart = () => {
    if (defaultVariant) {
      addToCart(product, defaultVariant, 1);
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group flex gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link 
          href={`/products/${handle}`}
          className="flex-shrink-0 w-48 h-48"
        >
          <div className="relative h-full w-full rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium">
              3D View
            </div>
          </div>
        </Link>
        
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <Link href={`/products/${handle}`} className="block">
              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors">{title}</h3>
            </Link>
            <p className="mt-1 text-sm text-gray-500">3D Printed</p>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900">{formattedPrice}</p>
            <AddToCartButton 
              onAddToCart={handleAddToCart}
              className="w-48"
            />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="group">
      <Link 
        href={`/products/${handle}`}
        className="block"
      >
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 group-hover:opacity-90">
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
            
            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium">
              3D View
            </div>
          </div>
        </div>
        
        <div className="mt-3 flex justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">3D Printed</p>
          </div>
          <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
        </div>
      </Link>
      
      <div className="mt-4">
        <AddToCartButton 
          onAddToCart={handleAddToCart}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ProductCard; 