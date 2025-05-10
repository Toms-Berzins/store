import { createServerClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { AddressInput } from '@/types/address';

// Get all addresses for the current user
export async function GET() {
  const supabase = createServerClient();
  
  // Get the current user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get all addresses for the user
  const { data: addresses, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', session.user.id)
    .order('is_default', { ascending: false });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ addresses });
}

// Create a new address for the current user
export async function POST(request: NextRequest) {
  const supabase = createServerClient();
  
  // Get the current user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const addressData: AddressInput = await request.json();
    
    // Check if this is the first address for the user, make it default if so
    const { count } = await supabase
      .from('addresses')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', session.user.id);
    
    if (count === 0 && addressData.is_default === undefined) {
      addressData.is_default = true;
    }
    
    // If setting as default, update all other addresses to not be default
    if (addressData.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', session.user.id);
    }
    
    // Insert the new address
    const { data, error } = await supabase
      .from('addresses')
      .insert([
        {
          user_id: session.user.id,
          ...addressData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ])
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ address: data[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
} 