import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Address, AddressInput } from '@/types/address';
import { supabase } from '@/lib/supabase';
import countriesList from '@/lib/countries';

interface AddressFormProps {
  addressId?: string; // If provided, we're editing an existing address
}

export default function AddressForm({ addressId }: AddressFormProps) {
  const router = useRouter();
  const isEditMode = !!addressId;

  const [formData, setFormData] = useState<AddressInput>({
    name: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    phone_number: '',
    is_default: false,
    is_shipping_address: true,
    is_billing_address: true,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);
  const [error, setError] = useState<string | null>(null);

  // Load existing address data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchAddress();
    }
  }, [isEditMode, addressId]);

  const fetchAddress = async () => {
    try {
      const { data, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', addressId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        setFormData({
          name: data.name,
          address_line1: data.address_line1,
          address_line2: data.address_line2 || '',
          city: data.city,
          state: data.state || '',
          postal_code: data.postal_code,
          country: data.country,
          phone_number: data.phone_number || '',
          is_default: data.is_default,
          is_shipping_address: data.is_shipping_address,
          is_billing_address: data.is_billing_address,
        });
      }
    } catch (err) {
      console.error('Error fetching address:', err);
      setError('Failed to load address data. Please try again later.');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Prepare the data to send to the API
      const addressData: AddressInput = {
        ...formData,
        // Remove empty strings for optional fields
        address_line2: formData.address_line2 || undefined,
        state: formData.state || undefined,
        phone_number: formData.phone_number || undefined,
      };
      
      if (isEditMode) {
        // Update existing address
        const { error } = await supabase
          .from('addresses')
          .update(addressData)
          .eq('id', addressId);
          
        if (error) throw new Error(error.message);
      } else {
        // Create new address
        const { error } = await supabase
          .from('addresses')
          .insert([addressData]);
          
        if (error) throw new Error(error.message);
      }
      
      // Redirect back to addresses list
      router.push('/account/addresses');
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center p-8">Loading address...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Address' : 'Add New Address'}
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="address_line1" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1
            </label>
            <input
              type="text"
              id="address_line1"
              name="address_line1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.address_line1}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="address_line2" className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              id="address_line2"
              name="address_line2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.address_line2}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State / Province (Optional)
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-1">
                Postal Code
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.postal_code}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                id="country"
                name="country"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select a country</option>
                {countriesList.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_default"
                name="is_default"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={formData.is_default}
                onChange={handleChange}
              />
              <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_shipping_address"
                name="is_shipping_address"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={formData.is_shipping_address}
                onChange={handleChange}
              />
              <label htmlFor="is_shipping_address" className="ml-2 block text-sm text-gray-700">
                Use as shipping address
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_billing_address"
                name="is_billing_address"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                checked={formData.is_billing_address}
                onChange={handleChange}
              />
              <label htmlFor="is_billing_address" className="ml-2 block text-sm text-gray-700">
                Use as billing address
              </label>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Address'}
          </button>
          
          <button
            type="button"
            onClick={() => router.push('/account/addresses')}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 