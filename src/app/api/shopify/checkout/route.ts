import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, shippingAddress } = body;

    // Shopify Storefront API endpoint
    const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN;
    
    if (!shopifyDomain || !storefrontAccessToken) {
      return NextResponse.json(
        { error: 'Shopify configuration is missing' },
        { status: 500 }
      );
    }

    const endpoint = `https://${shopifyDomain}/api/2023-07/graphql.json`;

    // Prepare line items for Shopify checkout
    const lineItems = items.map((item: any) => ({
      variantId: item.variantId,
      quantity: item.quantity
    }));

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
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: {
            lineItems,
            shippingAddress: {
              address1: shippingAddress.address,
              city: shippingAddress.city,
              country: shippingAddress.country,
              firstName: shippingAddress.firstName,
              lastName: shippingAddress.lastName,
              phone: shippingAddress.phone,
              province: '', // Add province/state if available
              zip: shippingAddress.postalCode
            }
          }
        }
      })
    });

    const result = await response.json();
    
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