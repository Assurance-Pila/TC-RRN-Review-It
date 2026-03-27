/* src/utils/fix-login.js */
// Fix the login issue by setting a user

export function fixLogin() {
  console.log('🔧 Fixing login issue...');
  
  // Get the first vendor to use as the current user
  const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
  
  if (vendors.length > 0) {
    const firstVendor = vendors[0];
    console.log('📋 Using first vendor as user:', firstVendor);
    
    // Create a user object from the vendor
    const user = {
      id: firstVendor.id,
      email: firstVendor.email,
      role: 'vendor',
      fullName: `${firstVendor.firstName || ''} ${firstVendor.lastName || ''}`.trim() || firstVendor.businessName || 'Vendor'
    };
    
    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(user));
    
    console.log('✅ User set:', user);
    console.log('🔄 Reloading page to apply changes...');
    
    // Reload the page
    window.location.reload();
  } else {
    console.log('❌ No vendors found in localStorage');
  }
}

// Make available in console
window.fixLogin = fixLogin;

console.log('🔧 Login fixer loaded. Run: fixLogin()');
