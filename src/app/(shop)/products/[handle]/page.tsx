import React from 'react';
import { getProductByHandle } from '@/lib/shopify';
import ProductDetails from '@/components/product/ProductDetails';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product data from Shopify
  const product = await getProductByHandle(params.handle);
  
  // If product not found, show 404 page
  if (!product) {
    notFound();
  }
  
  // In a real application, you would fetch this from your CMS or database
  // This is a placeholder for demonstration purposes
  const modelUrl = '/models/sample-model.glb';
  
  return (
    <div className="bg-white">
      <ProductDetails 
        product={product} 
        modelUrl={modelUrl} 
      />
    </div>
  );
} 