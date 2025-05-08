'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);
  
  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };
  
  const handleDecline = () => {
    // Set a flag for essential cookies only
    localStorage.setItem('cookieConsent', 'essential');
    setShowConsent(false);
  };
  
  if (!showConsent) return null;
  
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <div className="flex-1 mr-4">
            <p className="text-sm text-gray-700">
              We use cookies to improve your experience. By using our site, you agree to our{' '}
              <Link href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>.
            </p>
            <p className="mt-1 text-xs text-gray-500">
              This site is GDPR compliant. You can customize your cookie preferences.
            </p>
          </div>
          <div className="mt-4 flex flex-shrink-0 sm:mt-0">
            <button
              onClick={handleDecline}
              className="mr-3 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 