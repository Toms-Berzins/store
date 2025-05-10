import React from 'react';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export const metadata = {
  title: 'Checkout | 3D Print Store',
  description: 'Complete your purchase of 3D printed products',
};

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-8 text-center">
            Checkout
          </h1>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
} 