
import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://vaiajwmedonyhhbtoxhn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhaWFqd21lZG9ueWhoYnRveGhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2Mzk3MzIsImV4cCI6MjA2MDIxNTczMn0.oae-zUk6YV_AByp-_c3DwMxrMKTFW0LGqK97P2kVywA';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to store the Seoul City API key in Supabase
export const storeSeoulApiKey = async () => {
  // Check if API key table exists, if not create it
  const { error: tableCheckError } = await supabase
    .from('api_keys')
    .select('*')
    .limit(1)
    .maybeSingle();

  // If table doesn't exist (or there's an error), create it first
  if (tableCheckError) {
    // Create the api_keys table
    const { error: createTableError } = await supabase.rpc('create_api_keys_table');
    if (createTableError) {
      console.error('Error creating api_keys table:', createTableError);
      return { error: createTableError };
    }
  }

  // Store the Seoul City API key
  const { error } = await supabase
    .from('api_keys')
    .upsert([
      {
        name: 'seoul_jobs_api',
        key: '43667249786d79653839584d757553',
        created_at: new Date()
      }
    ], { onConflict: 'name' });

  if (error) {
    console.error('Error storing API key:', error);
    return { error };
  }

  return { success: true };
};

// Function to get the Seoul City API key from Supabase
export const getSeoulApiKey = async () => {
  const { data, error } = await supabase
    .from('api_keys')
    .select('key')
    .eq('name', 'seoul_jobs_api')
    .single();

  if (error) {
    console.error('Error fetching API key:', error);
    return null;
  }

  return data?.key;
};

export default supabase;
