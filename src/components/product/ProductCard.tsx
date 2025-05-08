'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handle, title, images, priceRange } = product;
  
  // Get the first image or use a placeholder
  const imageData = images.edges[0]?.node || null;
  const imageUrl = imageData?.url || '/placeholder-product.jpg';
  const imageAlt = imageData?.altText || title;
  
  // Format the price
  const price = parseFloat(priceRange.minVariantPrice.amount);
  const currency = priceRange.minVariantPrice.currencyCode;
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
  
  return (
    <Link 
      href={`/products/${handle}`}
      className="group"
    >
      <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 group-hover:opacity-90">
        <div className="relative h-full w-full">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover object-center"
          />
          
          {/* 3D indicator badge */}
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-medium">
            3D View
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">3D Printed</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
      </div>
    </Link>
  );
};

export default ProductCard; 