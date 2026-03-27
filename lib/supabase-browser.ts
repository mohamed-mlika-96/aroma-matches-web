import { createClient, SupabaseClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wtcbwpwgicshmflhgwiw.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0Y2J3cHdnaWNzaG1mbGhnd2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjIyNjksImV4cCI6MjA4ODgzODI2OX0.T1loq9XF6VUNFStXpFiJZ9p7R8bn4ulisJUxGx34TYY'

let browserClient: SupabaseClient | null = null

export function getBrowserClient(): SupabaseClient {
  if (!browserClient) {
    browserClient = createClient(SUPABASE_URL, SUPABASE_KEY)
  }
  return browserClient
}
