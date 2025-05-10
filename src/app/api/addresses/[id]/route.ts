import { createServerClient } from '@/lib/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { AddressInput } from '@/types/address';

interface RouteParams {
  params: {
    id: string;
  };
}

// Get a single address
export async function GET(request: NextRequest, { params }: RouteParams) {
  const supabase = createServerClient();
  const addressId = params.id;
  
  // Get the current user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Get the address
  const { data: address, error } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', addressId)
    .eq('user_id', session.user.id)
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ address });
}

// Update an address
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const supabase = createServerClient();
  const addressId = params.id;
  
  // Get the current user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify the address belongs to the user
  const { data: existingAddress, error: fetchError } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', addressId)
    .eq('user_id', session.user.id)
    .single();
  
  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  
  try {
    const addressData: Partial<AddressInput> = await request.json();
    
    // If setting as default, update all other addresses to not be default
    if (addressData.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', session.user.id);
    }
    
    // Update the address
    const { data, error } = await supabase
      .from('addresses')
      .update({
        ...addressData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', addressId)
      .eq('user_id', session.user.id)
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ address: data[0] });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

// Delete an address
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const supabase = createServerClient();
  const addressId = params.id;
  
  // Get the current user
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Verify the address belongs to the user and check if it's the default
  const { data: existingAddress, error: fetchError } = await supabase
    .from('addresses')
    .select('*')
    .eq('id', addressId)
    .eq('user_id', session.user.id)
    .single();
  
  if (fetchError) {
    if (fetchError.code === 'PGRST116') {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  
  // Delete the address
  const { error } = await supabase
    .from('addresses')
    .delete()
    .eq('id', addressId)
    .eq('user_id', session.user.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // If it was the default address, set another address as default
  if (existingAddress.is_default) {
    const { data: addresses } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (addresses && addresses.length > 0) {
      await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', addresses[0].id)
        .eq('user_id', session.user.id);
    }
  }
  
  return NextResponse.json({ success: true });
} 