// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Missing Supabase environment variables');
  }

  try {
    return createBrowserClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    throw error;
  }
};
