import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import AddressList from '@/components/account/AddressList';

export const metadata = {
  title: 'Your Addresses',
  description: 'Manage your shipping and billing addresses',
};

export default async function AddressesPage() {
  const supabase = createServerClient();
  
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Addresses</h1>
      
      <AddressList />
    </div>
  );
} 