import { createClient } from '@supabase/supabase-js'

// Fallback configuration for the gallery project
const FALLBACK_SUPABASE_URL = 'https://qmphisoosproujqqrqaa.supabase.co'
const FALLBACK_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtcGhpc29vc3Byb3VqcXFycWFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzk1OTIsImV4cCI6MjA2NjYxNTU5Mn0.NGzz9E9zh_Ya8bgIa5rgig9z4uAVO3dbyORSumbx_V0'

// Try to get from environment variables first, then fallback to hardcoded values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Using fallback config:', !import.meta.env.VITE_SUPABASE_URL)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration - neither environment variables nor fallback values are available')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// Export configuration for reuse
export const supabaseConfig = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
}

// Test function to verify connection
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.storage.listBuckets()
    if (error) {
      console.error('Supabase Storage connection test failed:', error)
      return false
    }
    console.log('Supabase Storage connection successful. Buckets:', data?.map(b => b.name))
    return true
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
} 