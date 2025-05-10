import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | 3D Print Store',
  description: 'Complete your purchase of 3D printed products',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 