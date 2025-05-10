import { useState } from 'react';
import { ShoppingCart, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddToCartButtonProps {
  onAddToCart?: () => void;
  className?: string;
}

export default function AddToCartButton({
  className = '',
  onAddToCart
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    if (loading || added) return;
    
    setLoading(true);
    
    try {
      // Implement your cart addition logic here
      // This is where you would typically call your API
      
      setAdded(true);
      if (onAddToCart) onAddToCart();
      
      // Reset "added" state after 2 seconds
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      disabled={loading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative flex items-center justify-center gap-2 px-6 py-3 
        font-medium text-white rounded-lg
        backdrop-blur-sm bg-gradient-to-r from-blue-600 to-blue-700
        hover:from-blue-700 hover:to-blue-800
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-all duration-300 ease-in-out
        shadow-lg hover:shadow-xl
        ${added ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : ''}
        ${loading ? 'cursor-not-allowed opacity-75' : ''}
        ${className}
      `}
      aria-label="Add to cart"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Adding...</span>
          </motion.div>
        ) : added ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>Added to cart</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to cart</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
} 