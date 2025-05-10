'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/contexts/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="mt-12 text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Start adding some products to your cart!</p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <div className="flow-root">
                <ul className="divide-y divide-gray-200">
                  {cart.map((item) => {
                    const product = item.product;
                    const variant = item.variant;
                    const image = product.images.edges[0]?.node;
                    
                    const formattedPrice = new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(parseFloat(variant.price.amount) * item.quantity);
                    
                    return (
                      <li key={variant.id} className="py-6 flex">
                        {/* Product image */}
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          {image ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={image.url}
                                alt={image.altText || product.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover object-center"
                              />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-500 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Product details */}
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <Link href={`/products/${product.handle}`} className="hover:underline">
                                  {product.title}
                                </Link>
                              </h3>
                              <p className="ml-4">
                                {formattedPrice}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {variant.title !== 'Default Title' ? variant.title : ''}
                            </p>
                          </div>
                          
                          <div className="flex-1 flex items-end justify-between text-sm">
                            {/* Quantity selector */}
                            <div className="flex items-center">
                              <span className="mr-3 text-gray-500">Qty</span>
                              <div className="flex border border-gray-300 rounded-md">
                                <button
                                  type="button"
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                  onClick={() => updateQuantity(variant.id, item.quantity - 1)}
                                >
                                  <span className="sr-only">Decrease</span>
                                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                                <span className="px-2 py-1 text-center text-gray-900 min-w-[2rem]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="p-1 text-gray-500 hover:text-gray-700"
                                  onClick={() => updateQuantity(variant.id, item.quantity + 1)}
                                >
                                  <span className="sr-only">Increase</span>
                                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex space-x-4">
                              <button
                                type="button"
                                className="font-medium text-blue-600 hover:text-blue-500"
                                onClick={() => {/* TODO: Implement save for later */}}
                              >
                                Save for later
                              </button>
                              <button
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                                onClick={() => removeFromCart(variant.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="sticky top-8">
                <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {new Intl.NumberFormat('de-DE', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(subtotal)}
                      </p>
                    </div>
                    
                    {/* Estimated delivery */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-2 h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Estimated delivery: 2-4 business days</span>
                      </div>
                    </div>
                    
                    {/* Trust badges */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span>Secure checkout</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <span>30-day returns</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Checkout button */}
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      >
                        Proceed to Checkout
                      </Link>
                    </div>
                    
                    {/* Continue shopping */}
                    <div className="mt-6 text-center">
                      <Link
                        href="/products"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> →</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 