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
            url: '/mock-products/vase-1.jpg',
            altText: 'Geometric vase in white - front view'
          }
        },
        {
          node: {
            url: '/mock-products/vase-2.jpg',
            altText: 'Geometric vase in white - side view'
          }
        },
        {
          node: {
            url: '/mock-products/vase-3.jpg',
            altText: 'Geometric vase in white - with flowers'
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
            url: '/mock-products/phone-stand-1.jpg',
            altText: 'Phone stand in gray - front view'
          }
        },
        {
          node: {
            url: '/mock-products/phone-stand-2.jpg',
            altText: 'Phone stand in gray - side view'
          }
        },
        {
          node: {
            url: '/mock-products/phone-stand-3.jpg',
            altText: 'Phone stand in gray - with phone'
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
            url: '/mock-products/desk-organizer-1.jpg',
            altText: 'Desk organizer in wood finish - front view'
          }
        },
        {
          node: {
            url: '/mock-products/desk-organizer-2.jpg',
            altText: 'Desk organizer in wood finish - top view'
          }
        },
        {
          node: {
            url: '/mock-products/desk-organizer-3.jpg',
            altText: 'Desk organizer in wood finish - with items'
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
  },
  {
    id: 'mock-4',
    title: 'Wall Clock',
    description: 'Minimalist wall clock with a modern design. Features a silent movement mechanism and easy-to-read numbers.',
    handle: 'wall-clock',
    priceRange: {
      minVariantPrice: {
        amount: '39.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/wall-clock-1.jpg',
            altText: 'Wall clock in white - front view'
          }
        },
        {
          node: {
            url: '/mock-products/wall-clock-2.jpg',
            altText: 'Wall clock in white - side view'
          }
        },
        {
          node: {
            url: '/mock-products/wall-clock-3.jpg',
            altText: 'Wall clock in white - on wall'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-4-variant-1',
            title: 'White',
            price: {
              amount: '39.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-5',
    title: 'Plant Pot',
    description: 'Self-watering plant pot with drainage system. Perfect for indoor plants and succulents.',
    handle: 'plant-pot',
    priceRange: {
      minVariantPrice: {
        amount: '24.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/plant-pot-1.jpg',
            altText: 'Plant pot in terracotta - front view'
          }
        },
        {
          node: {
            url: '/mock-products/plant-pot-2.jpg',
            altText: 'Plant pot in terracotta - with plant'
          }
        },
        {
          node: {
            url: '/mock-products/plant-pot-3.jpg',
            altText: 'Plant pot in terracotta - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-5-variant-1',
            title: 'Terracotta',
            price: {
              amount: '24.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-6',
    title: 'Bookend Set',
    description: 'Decorative bookend set with a modern geometric design. Keeps your books organized while adding style to your shelf.',
    handle: 'bookend-set',
    priceRange: {
      minVariantPrice: {
        amount: '27.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/bookend-1.jpg',
            altText: 'Bookend set in black - front view'
          }
        },
        {
          node: {
            url: '/mock-products/bookend-2.jpg',
            altText: 'Bookend set in black - with books'
          }
        },
        {
          node: {
            url: '/mock-products/bookend-3.jpg',
            altText: 'Bookend set in black - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-6-variant-1',
            title: 'Black',
            price: {
              amount: '27.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-7',
    title: 'Cable Organizer',
    description: 'Cable management solution with multiple slots. Keeps your desk tidy and cables organized.',
    handle: 'cable-organizer',
    priceRange: {
      minVariantPrice: {
        amount: '15.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/cable-organizer-1.jpg',
            altText: 'Cable organizer in white - front view'
          }
        },
        {
          node: {
            url: '/mock-products/cable-organizer-2.jpg',
            altText: 'Cable organizer in white - with cables'
          }
        },
        {
          node: {
            url: '/mock-products/cable-organizer-3.jpg',
            altText: 'Cable organizer in white - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-7-variant-1',
            title: 'White',
            price: {
              amount: '15.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-8',
    title: 'Picture Frame',
    description: 'Modern picture frame with a minimalist design. Perfect for displaying your favorite photos.',
    handle: 'picture-frame',
    priceRange: {
      minVariantPrice: {
        amount: '22.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/picture-frame-1.jpg',
            altText: 'Picture frame in black - front view'
          }
        },
        {
          node: {
            url: '/mock-products/picture-frame-2.jpg',
            altText: 'Picture frame in black - with photo'
          }
        },
        {
          node: {
            url: '/mock-products/picture-frame-3.jpg',
            altText: 'Picture frame in black - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-8-variant-1',
            title: 'Black',
            price: {
              amount: '22.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-9',
    title: 'Key Holder',
    description: 'Wall-mounted key holder with hooks and a small shelf. Keeps your keys organized and easy to find.',
    handle: 'key-holder',
    priceRange: {
      minVariantPrice: {
        amount: '18.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/key-holder-1.jpg',
            altText: 'Key holder in wood - front view'
          }
        },
        {
          node: {
            url: '/mock-products/key-holder-2.jpg',
            altText: 'Key holder in wood - with keys'
          }
        },
        {
          node: {
            url: '/mock-products/key-holder-3.jpg',
            altText: 'Key holder in wood - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-9-variant-1',
            title: 'Wood',
            price: {
              amount: '18.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-10',
    title: 'Desk Lamp',
    description: 'Adjustable desk lamp with LED lighting. Perfect for your workspace or study area.',
    handle: 'desk-lamp',
    priceRange: {
      minVariantPrice: {
        amount: '45.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/desk-lamp-1.jpg',
            altText: 'Desk lamp in black - front view'
          }
        },
        {
          node: {
            url: '/mock-products/desk-lamp-2.jpg',
            altText: 'Desk lamp in black - lit'
          }
        },
        {
          node: {
            url: '/mock-products/desk-lamp-3.jpg',
            altText: 'Desk lamp in black - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-10-variant-1',
            title: 'Black',
            price: {
              amount: '45.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-11',
    title: 'Wall Shelf',
    description: 'Floating wall shelf with a modern design. Perfect for displaying decorative items or books.',
    handle: 'wall-shelf',
    priceRange: {
      minVariantPrice: {
        amount: '32.99',
        currencyCode: 'USD'
      }
    },
    images: {
      edges: [
        {
          node: {
            url: '/mock-products/wall-shelf-1.jpg',
            altText: 'Wall shelf in wood - front view'
          }
        },
        {
          node: {
            url: '/mock-products/wall-shelf-2.jpg',
            altText: 'Wall shelf in wood - with items'
          }
        },
        {
          node: {
            url: '/mock-products/wall-shelf-3.jpg',
            altText: 'Wall shelf in wood - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-11-variant-1',
            title: 'Wood',
            price: {
              amount: '32.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  },
  {
    id: 'mock-12',
    title: 'Coat Hook',
    description: 'Wall-mounted coat hook with multiple hooks. Perfect for organizing coats, bags, and accessories.',
    handle: 'coat-hook',
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
            url: '/mock-products/coat-hook-1.jpg',
            altText: 'Coat hook in black - front view'
          }
        },
        {
          node: {
            url: '/mock-products/coat-hook-2.jpg',
            altText: 'Coat hook in black - with items'
          }
        },
        {
          node: {
            url: '/mock-products/coat-hook-3.jpg',
            altText: 'Coat hook in black - side view'
          }
        }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'mock-12-variant-1',
            title: 'Black',
            price: {
              amount: '19.99',
              currencyCode: 'USD'
            },
            availableForSale: true
          }
        }
      ]
    }
  }
]; 