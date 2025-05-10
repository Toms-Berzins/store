import { NextRequest, NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify/shopify-fetch';

interface CheckoutItem {
  variantId: string;
  quantity: number;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
}

interface CheckoutRequestBody {
  items: CheckoutItem[];
  shippingAddress: ShippingAddress;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as CheckoutRequestBody;
    const { items, shippingAddress } = body;

    // Create checkout mutation
    const mutation = `
      mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }
    `;

    // Execute the GraphQL mutation
    const result = await shopifyFetch({
      query: mutation,
      variables: {
        input: {
          lineItems: items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          })),
          shippingAddress: {
            address1: shippingAddress.address,
            city: shippingAddress.city,
            country: shippingAddress.country,
            firstName: shippingAddress.firstName,
            lastName: shippingAddress.lastName,
            phone: shippingAddress.phone,
            province: '', // Add province/state if available
            zip: shippingAddress.postalCode
          },
          email: shippingAddress.email
        }
      }
    });
    
    if (result.data?.checkoutCreate?.checkout) {
      return NextResponse.json({
        checkoutUrl: result.data.checkoutCreate.checkout.webUrl
      });
    } else if (result.data?.checkoutCreate?.checkoutUserErrors?.length > 0) {
      return NextResponse.json(
        { error: result.data.checkoutCreate.checkoutUserErrors[0].message },
        { status: 400 }
      );
    } else {
      console.error('Shopify API error:', result);
      return NextResponse.json(
        { error: 'Failed to create checkout' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 