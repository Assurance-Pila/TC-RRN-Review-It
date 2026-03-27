/* src/utils/check-vendor-fields.js */
// Check what field names your vendor data actually uses

export function checkVendorFields() {
  console.log('🔍 Checking vendor field names...');
  
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
  
  console.log('👤 Current user:', user);
  
  if (vendors.length > 0) {
    console.log('📋 First vendor structure:');
    const firstVendor = vendors[0];
    Object.keys(firstVendor).forEach(key => {
      console.log(`- ${key}:`, firstVendor[key]);
    });
    
    const currentVendor = vendors.find(v =>
      String(v.id) === String(user?.id) ||
      (v.email && v.email === user?.email)
    );
    
    if (currentVendor) {
      console.log('🎯 Current vendor structure:');
      Object.keys(currentVendor).forEach(key => {
        console.log(`- ${key}:`, currentVendor[key]);
      });
      
      // Check for both possible field names
      console.log('\n🔍 Field name checks:');
      console.log('- vendor.name:', currentVendor.name);
      console.log('- vendor.businessName:', currentVendor.businessName);
      console.log('- vendor.first_name:', currentVendor.first_name);
      console.log('- vendor.last_name:', currentVendor.last_name);
      
    } else {
      console.log('❌ No current vendor found for user');
    }
  } else {
    console.log('❌ No vendors in localStorage');
  }
}

// Make available in console
window.checkVendorFields = checkVendorFields;

console.log('🔧 Field checker loaded. Run: checkVendorFields()');
