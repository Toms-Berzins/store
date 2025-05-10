'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/contexts/CartContext';
import { euVATRates, calculatePriceWithVAT } from '@/lib/vatRates';
import Image from 'next/image';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  email: string;
  phone: string;
  phoneCountryCode: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  bank?: string;
}

const initialAddress: ShippingAddress = {
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: '',
  country: 'DE',
  email: '',
  phone: '',
  phoneCountryCode: '+49',
};

const initialPaymentDetails: PaymentDetails = {
  cardNumber: '',
  cardName: '',
  expiryDate: '',
  cvv: '',
  bank: ''
};

// Add country codes mapping
const countryCodes: { [key: string]: string } = {
  'DE': '+49', // Germany
  'FR': '+33', // France
  'IT': '+39', // Italy
  'ES': '+34', // Spain
  'AT': '+43', // Austria
  'BE': '+32', // Belgium
  'NL': '+31', // Netherlands
  'PT': '+351', // Portugal
  'IE': '+353', // Ireland
  'DK': '+45', // Denmark
  'SE': '+46', // Sweden
  'FI': '+358', // Finland
  'PL': '+48', // Poland
  'CZ': '+420', // Czech Republic
  'SK': '+421', // Slovakia
  'HU': '+36', // Hungary
  'RO': '+40', // Romania
  'BG': '+359', // Bulgaria
  'GR': '+30', // Greece
  'HR': '+385', // Croatia
  'SI': '+386', // Slovenia
  'EE': '+372', // Estonia
  'LV': '+371', // Latvia
  'LT': '+370', // Lithuania
  'CY': '+357', // Cyprus
  'MT': '+356', // Malta
  'LU': '+352', // Luxembourg
  'GB': '+44', // United Kingdom
  'US': '+1', // United States
  'CA': '+1', // Canada
  'AU': '+61', // Australia
  'NZ': '+64', // New Zealand
  'JP': '+81', // Japan
  'CN': '+86', // China
  'IN': '+91', // India
  'BR': '+55', // Brazil
  'RU': '+7', // Russia
  'ZA': '+27', // South Africa
  'MX': '+52', // Mexico
  'SG': '+65', // Singapore
  'AE': '+971', // United Arab Emirates
  'SA': '+966', // Saudi Arabia
  'IL': '+972', // Israel
  'TR': '+90', // Turkey
  'CH': '+41', // Switzerland
  'NO': '+47', // Norway
};

// Add bank options mapping
const bankOptions: { [key: string]: { name: string; code: string }[] } = {
  'LV': [
    { name: 'Swedbank', code: 'swedbank' },
    { name: 'Citadele', code: 'citadele' },
    { name: 'SEB', code: 'seb' },
    { name: 'Luminor', code: 'luminor' },
    { name: 'Rietumu Banka', code: 'rietumu' },
    { name: 'BlueOrange Bank', code: 'blueorange' }
  ],
  'EE': [
    { name: 'Swedbank', code: 'swedbank' },
    { name: 'SEB', code: 'seb' },
    { name: 'LHV', code: 'lhv' },
    { name: 'Coop Pank', code: 'coop' }
  ],
  'LT': [
    { name: 'Swedbank', code: 'swedbank' },
    { name: 'SEB', code: 'seb' },
    { name: 'Luminor', code: 'luminor' },
    { name: 'Šiaulių Bankas', code: 'siauliu' }
  ]
};

export default function CheckoutPage() {
  const { cart, subtotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialAddress);
  const [vatInfo, setVatInfo] = useState({ vatAmount: 0, vatRate: 0 });
  const [total, setTotal] = useState(subtotal);
  const [shippingCost] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>(initialPaymentDetails);

  // Update VAT calculation when country or subtotal changes
  React.useEffect(() => {
    const { vatAmount, vatRate } = calculatePriceWithVAT(subtotal, shippingAddress.country);
    setVatInfo({ vatAmount, vatRate });
    setTotal(subtotal + vatAmount + shippingCost);
    
    // Update phone country code when country changes
    const newCountryCode = countryCodes[shippingAddress.country] || '+49';
    setShippingAddress(prev => ({
      ...prev,
      phoneCountryCode: newCountryCode
    }));
  }, [shippingAddress.country, subtotal, shippingCost]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    try {
      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingAddress,
          billing: {
            subtotal,
            vatAmount: vatInfo.vatAmount,
            vatRate: vatInfo.vatRate,
            shipping: shippingCost,
            total,
            bank: paymentDetails.bank
          }
        })
      });
      
      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  if (cart.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center py-8">
              <p className="text-gray-600">Your cart is empty</p>
              <a href="/products" className="mt-4 inline-block text-blue-600 hover:underline">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-8 text-center">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center cursor-pointer" onClick={() => setCurrentStep(1)}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Shipping</span>
                <div className="w-24 h-0.5 mx-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center cursor-pointer" onClick={() => currentStep > 1 && setCurrentStep(2)}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Payment</span>
                <div className="w-24 h-0.5 mx-4 bg-gray-200"></div>
              </div>
              <div className="flex items-center cursor-pointer" onClick={() => currentStep > 2 && setCurrentStep(3)}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-900">Review</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Shipping Step */}
            {currentStep === 1 && (
              <form onSubmit={handleShippingSubmit}>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingAddress.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingAddress.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shippingAddress.address}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={shippingAddress.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        {euVATRates.map((country) => (
                          <option key={country.code} value={country.code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingAddress.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <div className="relative flex-shrink-0 w-24">
                          <select
                            id="phoneCountryCode"
                            name="phoneCountryCode"
                            value={shippingAddress.phoneCountryCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                          >
                            {Object.entries(countryCodes).map(([code, prefix]) => (
                              <option key={code} value={prefix}>
                                {prefix}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleInputChange}
                          required
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123456789"
                        />
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        We&apos;ll use this to contact you about your order
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
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

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Payment Step */}
            {currentStep === 2 && (
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="relative">
                      <input
                        id="creditCard"
                        className="peer sr-only"
                        type="radio"
                        checked={paymentMethod === 'creditCard'}
                        onChange={handlePaymentMethodChange}
                        value="creditCard"
                        name="paymentMethod"
                      />
                      <label
                        htmlFor="creditCard"
                        className="flex flex-col p-6 border rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md peer-checked:border-blue-500 peer-checked:bg-blue-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                            </div>
                            <span className="ml-3 text-base font-medium text-gray-900">Credit Card</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span className="text-sm text-green-600">Secure</span>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <div className="w-12 h-8 bg-white/20 rounded"></div>
                              <p className="text-sm opacity-80">•••• •••• •••• 4242</p>
                            </div>
                            <div className="flex space-x-2">
                              <Image
                                src="https://cdn.shopify.com/s/files/1/0533/2089/files/visa.svg"
                                alt="Visa"
                                width={40}
                                height={40}
                                className="w-auto h-8"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between items-end">
                            <div>
                              <p className="text-xs opacity-80">Card Holder</p>
                              <p className="text-sm">JOHN DOE</p>
                            </div>
                            <div>
                              <p className="text-xs opacity-80">Expires</p>
                              <p className="text-sm">12/25</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6 space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentDetails.cardNumber}
                              onChange={(e) => {
                                const formatted = formatCardNumber(e.target.value);
                                setPaymentDetails(prev => ({ ...prev, cardNumber: formatted }));
                              }}
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                              Name on Card <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={paymentDetails.cardName}
                              onChange={handlePaymentDetailsChange}
                              placeholder="JOHN DOE"
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={paymentDetails.expiryDate}
                                onChange={(e) => {
                                  const formatted = formatExpiryDate(e.target.value);
                                  setPaymentDetails(prev => ({ ...prev, expiryDate: formatted }));
                                }}
                                placeholder="MM/YY"
                                maxLength={5}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={paymentDetails.cvv}
                                onChange={(e) => {
                                  const v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                                  if (v.length <= 4) {
                                    setPaymentDetails(prev => ({ ...prev, cvv: v }));
                                  }
                                }}
                                placeholder="123"
                                maxLength={4}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3 mt-4">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <p className="text-sm text-gray-500">
                              Your payment information is encrypted and secure. We never store your full card details.
                            </p>
                          </div>

                          {shippingAddress.country in bankOptions && (
                            <div>
                              <label htmlFor="bank" className="block text-sm font-medium text-gray-700 mb-1">
                                Select Bank <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="bank"
                                name="bank"
                                value={paymentDetails.bank}
                                onChange={handlePaymentDetailsChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="">Select your bank</option>
                                {bankOptions[shippingAddress.country].map((bank) => (
                                  <option key={bank.code} value={bank.code}>
                                    {bank.name}
                                  </option>
                                ))}
                              </select>
                              <p className="mt-1 text-sm text-gray-500">
                                Select your bank for faster payment processing
                              </p>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        id="paypal"
                        className="peer sr-only"
                        type="radio"
                        checked={paymentMethod === 'paypal'}
                        onChange={handlePaymentMethodChange}
                        value="paypal"
                        name="paymentMethod"
                      />
                      <label
                        htmlFor="paypal"
                        className="flex flex-col p-6 border rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md peer-checked:border-blue-500 peer-checked:bg-blue-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500">
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 scale-0 peer-checked:scale-100 transition-transform duration-200"></div>
                            </div>
                            <span className="ml-3 text-base font-medium text-gray-900">PayPal</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span className="text-sm text-green-600">Secure</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center space-x-3">
                          <Image
                            src="https://cdn.shopify.com/s/files/1/0533/2089/files/paypal.svg"
                            alt="Paypal"
                            width={80}
                            height={32}
                            className="w-auto h-8"
                          />
                          <div className="text-sm text-gray-500">
                            <p>Pay with your PayPal account</p>
                            <p className="text-xs mt-1">Fast, secure, and easy</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
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

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-medium transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Place Order (€{total.toFixed(2)})
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 