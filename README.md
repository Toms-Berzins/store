# 3D Print Store - E-Commerce MVP

This is an MVP for a 3D printed products e-commerce platform targeting the EU market. Built with Next.js 14, TypeScript, Tailwind CSS, and Shopify Headless Commerce.

## Features

- Modern responsive UI built with Tailwind CSS
- 3D product visualization with Three.js
- Full e-commerce functionality (product listings, cart, checkout)
- EU compliance (GDPR, VAT handling)
- Shopify integration for product management
- User accounts and saved addresses with Supabase
- Advanced product filtering and search
- Cookie consent for GDPR compliance
- Privacy policy and terms of service pages

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **3D Visualization:** Three.js
- **E-Commerce Backend:** Shopify Storefront API
- **Authentication & Database:** Supabase
- **Payment Processing:** Stripe (simulated in this MVP)
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Shopify store with Storefront API access
- A Supabase account
- ~~Stripe account (for production)~~ (No longer required - using Shopify Payments)

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
# Required Environment Variables
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN=your-storefront-access-token

# Supabase Environment Variables
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# The following Stripe variables are no longer required as we've switched to Shopify Payments
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
# STRIPE_SECRET_KEY=your-stripe-secret-key
```

4. Set up your Supabase tables:

Create two tables in Supabase:
- `profiles`: For user profile information
- `addresses`: For saving user shipping and billing addresses

Use the following SQL to set up your tables:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create RLS policy for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create addresses table
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL,
  phone_number TEXT,
  is_default BOOLEAN DEFAULT false NOT NULL,
  is_shipping_address BOOLEAN DEFAULT true NOT NULL,
  is_billing_address BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create RLS policy for addresses
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own addresses" ON addresses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own addresses" ON addresses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id);
```

5. Start the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

- Customer reviews and ratings
- More payment methods
- Enhanced 3D customization tools
- Marketing automation
- Wishlists and saved items
- Order tracking and history

## GDPR Compliance

This application includes:

- Cookie consent banner
- Privacy policy page
- Terms of service page
- Data processing transparency
- VAT handling for EU countries

## License

[MIT](LICENSE)
