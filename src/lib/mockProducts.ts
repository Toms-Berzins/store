import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 'mock-1',
    title: 'Geometric Vase',
    description: 'A modern geometric vase perfect for displaying dried flowers or as a standalone decorative piece. 3D printed with high-quality PLA material.',
    handle: 'geometric-vase',
    priceRange: {
      minVariantPrice: {
        amount: '29.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/vase.jpg',
            altText: 'Geometric vase in white'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-1-variant-1',
            title: 'White',
            price: {
              amount: '29.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        },
        {
          node: {
            id: 'mock-1-variant-2',
            title: 'Black',
            price: {
              amount: '29.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-2',
    title: 'Phone Stand',
    description: 'Ergonomic phone stand with cable management. Perfect for your desk or bedside table. Made from durable ABS material.',
    handle: 'phone-stand',
    priceRange: {
      minVariantPrice: {
        amount: '19.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/phone-stand.jpg',
            altText: 'Phone stand in gray'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-2-variant-1',
            title: 'Gray',
            price: {
              amount: '19.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-3',
    title: 'Desk Organizer',
    description: 'Multi-compartment desk organizer with pen holder and phone slot. Helps keep your workspace tidy and organized.',
    handle: 'desk-organizer',
    priceRange: {
      minVariantPrice: {
        amount: '34.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/desk-organizer.jpg',
            altText: 'Desk organizer in wood finish'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-3-variant-1',
            title: 'Wood Finish',
            price: {
              amount: '34.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  }
]; 