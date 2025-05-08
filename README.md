# 3D Print Store - E-Commerce MVP

This is an MVP for a 3D printed products e-commerce platform targeting the EU market. Built with Next.js 14, TypeScript, Tailwind CSS, and Shopify Headless Commerce.

## Features

- Modern responsive UI built with Tailwind CSS
- 3D product visualization with Three.js
- Full e-commerce functionality (product listings, cart, checkout)
- EU compliance (GDPR, VAT handling)
- Shopify integration for product management

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **3D Visualization:** Three.js
- **E-Commerce Backend:** Shopify Storefront API
- **Payment Processing:** Stripe (simulated in this MVP)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Shopify store with Storefront API access
- Stripe account (for production)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/3d-print-store.git
cd 3d-print-store
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/lib` - Utility functions and API clients
- `/src/types` - TypeScript type definitions
- `/public` - Static assets including 3D models and images

## Deployment

This project is designed to be deployed on Vercel. Connect your GitHub repository to Vercel for automatic deployments.

## Future Enhancements

Planned enhancements beyond this MVP:

- Advanced product filtering and search
- User accounts and saved addresses
- Customer reviews and ratings
- More payment methods
- Enhanced 3D customization tools
- Marketing automation

## GDPR Compliance

This application includes:

- Cookie consent banner
- Privacy policy page
- Terms of service page
- Data processing transparency
- VAT handling for EU countries

## License

[MIT](LICENSE)
