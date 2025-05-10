interface ShopifyFetchParams {
  query: string;
  variables: Record<string, any>;
  cache?: RequestCache;
}

export async function shopifyFetch({
  query,
  variables,
  cache = 'no-store',
}: ShopifyFetchParams): Promise<any> {
  const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
    ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`
    : '';

  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_PUBLIC_ACCESS_TOKEN || '';

  if (!endpoint || !accessToken) {
    throw new Error('Shopify API credentials not found');
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache,
    });

    const body = await result.json();

    if (body.errors) {
      throw new Error(
        `Shopify API error: ${body.errors.map((e: Error) => e.message).join(', ')}`
      );
    }

    return body;
  } catch (error) {
    throw new Error(`Failed to fetch from Shopify API: ${error instanceof Error ? error.message : String(error)}`);
  }
} 