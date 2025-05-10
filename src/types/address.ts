export interface Address {
  id: string;
  user_id: string;
  name: string;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state?: string | null;
  postal_code: string;
  country: string;
  phone_number?: string | null;
  is_default: boolean;
  is_shipping_address: boolean;
  is_billing_address: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressInput {
  name: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
  phone_number?: string;
  is_default?: boolean;
  is_shipping_address?: boolean;
  is_billing_address?: boolean;
} 