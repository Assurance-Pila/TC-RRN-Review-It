/* src/utils/quick-fix.js */
// Quick fix to set a user from existing vendors

export function quickFix() {
  console.log('🔧 Quick fixing user login...');
  
  const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
  
  if (vendors.length > 0) {
    // Use the first vendor as the logged-in user
    const firstVendor = vendors[0];
    console.log('📋 Using vendor as user:', firstVendor);
    
    // Create user object
    const user = {
      id: firstVendor.id,
      email: firstVendor.email,
      role: 'vendor',
      fullName: firstVendor.businessName || `${firstVendor.firstName || ''} ${firstVendor.lastName || ''}`.trim() || 'Vendor'
    };
    
    // Set user in localStorage
    localStorage.setItem("user", JSON.stringify(user));
    
    console.log('✅ User set successfully:', user);
    console.log('🔄 Reloading page...');
    
    // Reload to apply changes
    window.location.reload();
  } else {
    console.log('❌ No vendors found in localStorage');
  }
}

// Make available in console
window.quickFix = quickFix;

console.log('🔧 Quick fix loaded. Run: quickFix()');
