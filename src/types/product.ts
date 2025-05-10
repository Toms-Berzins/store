export interface ProductImage {
  url: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

export interface Product {
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
      node: ProductImage;
    }>;
  };
  variants?: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
  category?: string;
  materials?: string[];
}

export interface ShopifyProduct {
  node: Product;
}

// For 3D model data
export interface Product3DModel {
  url: string;
  format: string;
  defaultMaterial?: string;
  availableMaterials?: string[];
} 