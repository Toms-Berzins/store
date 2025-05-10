import React from 'react';

export const metadata = {
  title: 'Privacy Policy | 3D Print Store',
  description: 'Privacy Policy and data processing information for 3D Print Store',
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <div className="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p>
              This Privacy Policy explains how 3D Print Store ("we," "us," or "our") collects, uses, and shares your personal information when you visit our website, shop with us, or otherwise interact with our services.
            </p>
            <p>
              We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data and tell you about your privacy rights and how the law protects you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p>We collect several types of information from and about users of our Website, including information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>By which you may be personally identified, such as name, postal address, e-mail address, telephone number, and payment information ("personal information");</li>
              <li>That is about you but individually does not identify you, such as traffic data, location data, logs, and other communication data; and</li>
              <li>About your internet connection, the equipment you use to access our Website, and usage details.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Collect Your Information</h2>
            <p>We collect this information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Directly from you when you provide it to us (such as when you create an account or place an order).</li>
              <li>Automatically as you navigate through the site (information collected automatically may include usage details, IP addresses, and information collected through cookies).</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p>We may use the information we collect from you for various purposes, including to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Provide customer service and respond to your inquiries</li>
              <li>Send transactional emails (such as order confirmations)</li>
              <li>Send marketing communications if you've opted in</li>
              <li>Improve our website and product offerings</li>
              <li>Comply with our legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track the activity on our Website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our Website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights Under GDPR</h2>
            <p>If you are a resident of the European Union, you have the following rights under the GDPR:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Right to access</strong> - You have the right to request copies of your personal data.</li>
              <li><strong>Right to rectification</strong> - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>Right to erasure</strong> - You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>Right to restrict processing</strong> - You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>Right to object to processing</strong> - You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>Right to data portability</strong> - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
            <p>
              If you would like to exercise any of these rights, please contact us at privacy@3dprintstore.example.com.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
            <p>
              We will retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <address className="not-italic mt-2">
              3D Print Store<br />
              Example Street 123<br />
              10115 Berlin, Germany<br />
              Email: privacy@3dprintstore.example.com
            </address>
          </section>
        </div>
      </div>
    </div>
  );
} 