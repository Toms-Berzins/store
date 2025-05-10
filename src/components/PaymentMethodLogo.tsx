import Image from 'next/image';

interface PaymentMethodLogoProps {
  type: 'visa' | 'mastercard' | 'amex' | 'paypal';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const sizes = {
  small: { width: 32, height: 32 },
  medium: { width: 40, height: 40 },
  large: { width: 80, height: 32 },
};

const logos = {
  visa: 'https://cdn.shopify.com/s/files/1/0533/2089/files/visa.svg',
  mastercard: 'https://cdn.shopify.com/s/files/1/0533/2089/files/mastercard.svg',
  amex: 'https://cdn.shopify.com/s/files/1/0533/2089/files/american-express.svg',
  paypal: 'https://cdn.shopify.com/s/files/1/0533/2089/files/paypal.svg',
};

export default function PaymentMethodLogo({ type, size = 'medium', className = '' }: PaymentMethodLogoProps) {
  const dimensions = sizes[size];
  
  return (
    <Image
      src={logos[type]}
      alt={type.charAt(0).toUpperCase() + type.slice(1)}
      width={dimensions.width}
      height={dimensions.height}
      className={`w-auto ${className}`}
      priority
    />
  );
} 