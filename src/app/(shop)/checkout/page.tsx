'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

// Simple checkout page, in a real application this would integrate with Stripe
export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'DE',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const shippingCost = 5.99;
  const vatRate = 0.19; // 19% VAT in Germany
  const vatAmount = (subtotal + shippingCost) * vatRate;
  const total = subtotal + shippingCost + vatAmount;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) return;
    
    setIsSubmitting(true);
    
    // Simulate API call to create order
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
      clearCart();
    }, 1500);
  };
  
  if (isComplete) {
    return (
      <div className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-xl mx-auto">
            <div className="text-center">
              <svg
                className="h-12 w-12 text-green-600 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                Order Confirmed!
              </h1>
              <p className="mt-2 text-lg text-gray-500">
                Thank you for your order. We've received your payment and will process your items shortly.
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Order #: ORD-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
              </p>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (cart.length === 0) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Checkout</h1>
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
            <p className="mt-1 text-sm text-gray-500">Add some products to your cart before checking out.</p>
            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <h2 className="sr-only">Checkout</h2>
        
        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={handleSubmit}>
          {/* Shipping information */}
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Shipping information</h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="ES">Spain</option>
                      <option value="IT">Italy</option>
                      <option value="NL">Netherlands</option>
                      <option value="BE">Belgium</option>
                      <option value="AT">Austria</option>
                      <option value="PL">Poland</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment (simplified for MVP) */}
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">
                  For this MVP, we're simulating payment. In a production app, this would integrate with Stripe or another payment processor.
                </p>
              </div>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            
            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => {
                  const product = item.product;
                  const variant = item.variant;
                  const image = product.images.edges[0]?.node;
                  
                  return (
                    <li key={variant.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        {image ? (
                          <div className="w-20 h-20 rounded-md border border-gray-200 overflow-hidden relative">
                            <Image
                              src={image.url}
                              alt={image.altText || product.title}
                              fill
                              className="object-cover object-center"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <Link href={`/products/${product.handle}`} className="font-medium text-gray-700 hover:text-gray-800">
                                {product.title}
                              </Link>
                            </h4>
                            {variant.title !== 'Default Title' && (
                              <p className="mt-1 text-sm text-gray-500">{variant.title}</p>
                            )}
                            <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                          </div>
                          
                          <div className="ml-4 flex-shrink-0">
                            <p className="text-sm font-medium text-gray-900">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: variant.price.currencyCode,
                              }).format(parseFloat(variant.price.amount) * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              
              <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(subtotal)}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(shippingCost)}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between">
                  <dt className="text-sm">VAT (19%)</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(vatAmount)}
                  </dd>
                </div>
                
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(total)}
                  </dd>
                </div>
              </dl>
              
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm order'}
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                By placing this order you agree to our{' '}
                <Link href="/terms" className="underline">Terms and Conditions</Link> and{' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                All personal data is processed in accordance with the GDPR.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 