/* src/utils/create-test-users.js */
// Run this in browser console to create test users
// Make sure you're logged into Supabase Auth first

import { supabase, db } from './database.js'

export async function createTestUsers() {
  console.log('🧪 Creating test users...')
  
  try {
    // Test user
    const { data: user, error: userError } = await db.createUser({
      email: 'user@example.com',
      password: 'password123',
      full_name: 'John Doe',
      role: 'user'
    })
    
    if (userError) {
      console.log('User might already exist:', userError.message)
    } else {
      console.log('✅ Test user created:', user.email)
    }
    
    // Test vendor
    const { data: vendor, error: vendorError } = await db.createVendor({
      email: 'vendor@example.com',
      password: 'password123',
      first_name: 'Jean',
      last_name: 'Mbah',
      business_name: 'Douala Styles',
      category: 'Fashion',
      social_media_url: '@doualastyles',
      phone: '+237 6XX XXX XXX',
      role: 'vendor',
      platform_verified: true,
      community_verified: false
    })
    
    if (vendorError) {
      console.log('Vendor might already exist:', vendorError.message)
    } else {
      console.log('✅ Test vendor created:', vendor.email)
    }
    
    // Test admin
    const { data: admin, error: adminError } = await db.createUser({
      email: 'admin@example.com',
      password: 'password123',
      full_name: 'Admin User',
      role: 'admin'
    })
    
    if (adminError) {
      console.log('Admin might already exist:', adminError.message)
    } else {
      console.log('✅ Test admin created:', admin.email)
    }
    
    console.log('🎉 Test users ready!')
    console.log('Login credentials:')
    console.log('User: user@example.com / password123')
    console.log('Vendor: vendor@example.com / password123')
    console.log('Admin: admin@example.com / password123')
    
  } catch (error) {
    console.error('❌ Error creating test users:', error)
  }
}

// Make available in console
window.createTestUsers = createTestUsers

console.log('🔧 Test user creator loaded. Run: createTestUsers()')
