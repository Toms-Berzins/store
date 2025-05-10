import { createServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User } from 'lucide-react';

export default async function AccountPage() {
  const supabase = createServerClient();
  
  // Get the current session
  const { data: { session } } = await supabase.auth.getSession();
  
  // Redirect to login if not authenticated
  if (!session) {
    redirect('/auth/login');
  }
  
  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', session.user.id)
    .single();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar navigation */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            {profile?.first_name ? (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                {profile.first_name[0]}
                {profile.last_name ? profile.last_name[0] : ''}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <User className="w-6 h-6" />
              </div>
            )}
            <div>
              <div className="font-medium">
                {profile?.first_name 
                  ? `${profile.first_name} ${profile.last_name || ''}` 
                  : session.user.email}
              </div>
              {profile?.first_name && (
                <div className="text-sm text-gray-500">{session.user.email}</div>
              )}
            </div>
          </div>
          
          <nav className="space-y-1">
            <Link 
              href="/account"
              className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium"
            >
              Account Overview
            </Link>
            <Link 
              href="/account/orders"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Orders
            </Link>
            <Link 
              href="/account/addresses"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Addresses
            </Link>
            <Link 
              href="/account/profile"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Profile Settings
            </Link>
            <form 
              action="/api/auth/signout" 
              method="post"
            >
              <button
                type="submit"
                className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
              >
                Sign Out
              </button>
            </form>
          </nav>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
            <p className="text-gray-600 mb-4">
              Welcome to your account dashboard where you can view your recent orders, 
              manage your shipping addresses, and update your profile information.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <Link
                href="/account/orders"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold mb-1">Your Orders</h3>
                <p className="text-sm text-gray-600">Track, return, or buy things again</p>
              </Link>
              
              <Link
                href="/account/addresses"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold mb-1">Your Addresses</h3>
                <p className="text-sm text-gray-600">Edit addresses for orders and gifts</p>
              </Link>
              
              <Link
                href="/account/profile"
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
              >
                <h3 className="font-semibold mb-1">Profile Settings</h3>
                <p className="text-sm text-gray-600">Edit your name, email, or password</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 