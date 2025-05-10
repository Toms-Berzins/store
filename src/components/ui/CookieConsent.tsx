'use client';

import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    // Implement cookie clearing logic here if needed
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex-1 mr-4 mb-4 sm:mb-0">
          <h3 className="text-base font-medium text-gray-900">Cookie Consent</h3>
          <p className="mt-1 text-sm text-gray-600">
            We use cookies to enhance your browsing experience, serve personalized ads, and analyze our traffic. 
            By clicking &quot;Accept&quot;, you consent to our use of cookies.
            <a href="/privacy-policy" className="ml-1 text-blue-600 hover:text-blue-500">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={declineCookies}
            className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Decline
          </button>
          <button
            onClick={acceptCookies}
            className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 