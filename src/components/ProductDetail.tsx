import { useState, useEffect } from 'react';
import Image from 'next/image';
import AddToCartButton from './AddToCartButton';
import { addToCart, createCart } from '@/lib/shopify/cart';

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    images: {
      url: string;
      altText?: string;
    }[];
    variants: {
      id: string;
      title: string;
      availableForSale: boolean;
    }[];
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Initialize or retrieve cart from localStorage
  useEffect(() => {
    const storedCartId = localStorage.getItem('cartId');
    if (storedCartId) {
      setCartId(storedCartId);
    } else {
      const initializeCart = async () => {
        try {
          const { cartId } = await createCart();
          localStorage.setItem('cartId', cartId);
          setCartId(cartId);
        } catch (error) {
          console.error('Failed to create cart:', error);
        }
      };
      initializeCart();
    }
  }, []);

  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

  const handleAddToCart = async () => {
    if (!cartId || isAddingToCart) return;
    
    setIsAddingToCart(true);
    
    try {
      await addToCart(cartId, [
        {
          merchandiseId: selectedVariant.id,
          quantity,
        },
      ]);
      
      // Optional: Show cart notification or redirect to cart page
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.images.length > 0 && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          
          <p className="text-2xl font-medium">
            {formatPrice(product.price.amount, product.price.currencyCode)}
          </p>
          
          <div className="prose max-w-none">
            <p>{product.description}</p>
          </div>
          
          {/* Variant Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Options</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 text-sm border rounded-full transition ${
                      selectedVariant.id === variant.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-gray-300 hover:border-indigo-300'
                    } ${!variant.availableForSale ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!variant.availableForSale}
                  >
                    {variant.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity Selector */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Quantity</h3>
            <div className="flex items-center border border-gray-300 rounded-md max-w-[120px]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-indigo-600"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full text-center focus:outline-none"
                aria-label="Quantity"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-indigo-600"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <AddToCartButton 
            productId={product.id}
            variantId={selectedVariant.id}
            quantity={quantity}
            className="w-full md:w-auto"
            onAddToCart={handleAddToCart}
          />
          
          {/* Additional info */}
          <div className="border-t pt-6 space-y-4 text-sm text-gray-600">
            <p>✓ Free shipping on orders over €50</p>
            <p>✓ 30-day returns policy</p>
            <p>✓ Secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
} 