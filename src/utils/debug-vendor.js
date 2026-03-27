/* src/utils/debug-vendor.js */
// Debug script to check vendor login issues

import { db, supabase } from './database.js'

export async function debugVendorLogin(email) {
  console.log(`🔍 Debugging vendor login for: ${email}`)
  
  try {
    // 1. Check Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: 'password123' // Use the actual password
    })
    
    if (authError) {
      console.error('❌ Supabase Auth error:', authError)
      return
    }
    
    console.log('✅ Supabase Auth success:', authData.user)
    console.log('📋 User metadata:', authData.user.user_metadata)
    
    // 2. Check vendor in database
    const { data: vendorData, error: vendorError } = await db.getVendorByEmail(email)
    
    if (vendorError) {
      console.error('❌ Database vendor error:', vendorError)
    } else {
      console.log('✅ Vendor in database:', vendorData)
    }
    
    // 3. Check if we need to create vendor record
    if (!vendorData) {
      console.log('🔧 Creating vendor record...')
      const { data: newVendor, error: createError } = await db.createVendor({
        email: email,
        first_name: authData.user.user_metadata?.first_name || 'Test',
        last_name: authData.user.user_metadata?.last_name || 'Vendor',
        business_name: authData.user.user_metadata?.business_name || 'Test Business',
        category: authData.user.user_metadata?.category || 'Other',
        social_media_url: authData.user.user_metadata?.social_media_url || '',
        phone: authData.user.user_metadata?.phone || '+237 6XX XXX XXX',
        role: 'vendor',
        rating: 0,
        reviews: 0,
        profile_views: 0,
        platform_verified: false,
        community_verified: false,
        scam: false
      })
      
      if (createError) {
        console.error('❌ Error creating vendor:', createError)
      } else {
        console.log('✅ Vendor created:', newVendor)
      }
    }
    
  } catch (error) {
    console.error('❌ Debug error:', error)
  }
}

// Make available in console
window.debugVendorLogin = debugVendorLogin

console.log('🔧 Vendor debug loaded. Run: debugVendorLogin("vendor-email@example.com")')
