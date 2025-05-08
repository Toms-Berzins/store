import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { mockProducts } from './mockProducts';

// Initialize Shopify client
export const shopifyClient = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '',
  apiVersion: '2023-10', // Use the latest stable API version
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '',
});

// Function to fetch all products
export async function getAllProducts() {
  // Use mock products in development
  if (process.env.NODE_ENV === 'development') {
    return mockProducts;
  }

  const { data } = await shopifyClient.request(`
    query GetProducts {
      products(first: 100) {
        edges {
          node {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `);
  
  interface ProductNode {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
  }
  
  return data.products.edges.map(({ node }: { node: ProductNode }) => node);
}

// Function to fetch a single product by handle
export async function getProductByHandle(handle: string) {
  const { data } = await shopifyClient.request(`
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
            }
          }
        }
      }
    }
  `, {
    variables: {
      handle,
    },
  });
  
  return data.product;
} 