import { createServerClient } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // If there's no code in the URL, we can't do anything
  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/error`);
  }

  const cookieStore = cookies();
  const supabase = createServerClient();
  
  // Exchange the code for a session
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  
  if (error) {
    return NextResponse.redirect(`${requestUrl.origin}/auth/error`);
  }

  return NextResponse.redirect(`${requestUrl.origin}/account`);
} 