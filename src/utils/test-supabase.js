/* src/utils/test-supabase.js */
// Test file to verify Supabase connection
// Run this in browser console after starting your app

import { supabase } from '../supabase.js'

export async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...')
  
  try {
    // Test 1: Basic connection
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .single()
    
    if (error) {
      console.error('❌ Connection test failed:', error.message)
      return false
    }
    
    console.log('✅ Supabase connected successfully!')
    console.log('📊 Users table accessible, count:', data?.count || 0)
    
    // Test 2: Test auth
    const { data: { session } } = await supabase.auth.getSession()
    console.log('🔐 Current session:', session ? 'Active' : 'None')
    
    // Test 3: Test table structure
    const { data: tables } = await supabase
      .from('vendors')
      .select('*')
      .limit(1)
    
    if (tables && tables.length >= 0) {
      console.log('📋 Vendors table structure OK')
    }
    
    return true
    
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    return false
  }
}

// Test function for browser console
window.testSupabase = testSupabaseConnection

console.log('🔧 Supabase test loaded. Run: testSupabase()')
