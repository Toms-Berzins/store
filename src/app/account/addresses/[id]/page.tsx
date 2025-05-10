import { createServerClient } from '@/lib/supabase-server';
import { redirect, notFound } from 'next/navigation';
import AddressForm from '@/components/account/AddressForm';

export const metadata = {
  title: 'Edit Address',
  description: 'Edit your shipping and billing address',
};

interface AddressEditPageProps {
  params: {
    id: string;
  };
}

export default async function AddressEditPage({ params }: AddressEditPageProps) {
  const supabase = createServerClient();
  const addressId = params.id;
  
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
  }
  
  // Verify address belongs to user (unless it's new)
  if (addressId !== 'new') {
    const { data: address, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', addressId)
      .eq('user_id', session.user.id)
      .single();
    
    if (error || !address) {
      notFound();
    }
  }
  
  const title = addressId === 'new' ? 'Add New Address' : 'Edit Address';
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      
      <AddressForm addressId={addressId !== 'new' ? addressId : undefined} />
    </div>
  );
} 