import { useState, useEffect } from 'react';
import { Address } from '@/types/address';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

export default function AddressList() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load addresses when component mounts
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Function to fetch addresses from the API
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .order('is_default', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      setAddresses(data || []);
    } catch (err) {
      console.error('Error fetching addresses:', err);
      setError('Failed to load addresses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an address
  const deleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Remove the deleted address from the state
      setAddresses(addresses.filter(address => address.id !== id));
    } catch (err) {
      console.error('Error deleting address:', err);
      alert('Failed to delete address. Please try again later.');
    }
  };

  // Function to set an address as default
  const setDefaultAddress = async (id: string) => {
    try {
      // First, set all addresses as non-default
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .neq('id', id);

      // Then set the selected address as default
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      // Update the addresses in state
      setAddresses(addresses.map(address => ({
        ...address,
        is_default: address.id === id
      })));
    } catch (err) {
      console.error('Error setting default address:', err);
      alert('Failed to update address. Please try again later.');
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading addresses...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
        {error}
        <button 
          onClick={fetchAddresses}
          className="ml-4 text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Addresses</h2>
        <Link 
          href="/account/addresses/new"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <PlusCircle className="w-5 h-5 mr-1" />
          Add New Address
        </Link>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't added any addresses yet.</p>
          <Link 
            href="/account/addresses/new"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Add Your First Address
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {addresses.map((address) => (
            <div 
              key={address.id} 
              className={`border rounded-lg p-4 ${address.is_default ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              {address.is_default && (
                <div className="text-blue-600 text-sm font-medium mb-2">Default Address</div>
              )}
              
              <div className="mb-2">
                <div className="font-medium">{address.name}</div>
                <div>{address.address_line1}</div>
                {address.address_line2 && <div>{address.address_line2}</div>}
                <div>{address.city}, {address.state || ''} {address.postal_code}</div>
                <div>{address.country}</div>
                {address.phone_number && <div>{address.phone_number}</div>}
              </div>
              
              <div className="flex space-x-4 mt-4">
                {!address.is_default && (
                  <button
                    onClick={() => setDefaultAddress(address.id)}
                    className="text-blue-600 text-sm hover:text-blue-800"
                  >
                    Set as Default
                  </button>
                )}
                <Link
                  href={`/account/addresses/${address.id}`}
                  className="flex items-center text-gray-600 text-sm hover:text-gray-800"
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="flex items-center text-red-600 text-sm hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 