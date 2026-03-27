/* src/utils/debug-vendor-data.js */
// Debug script to check vendor data structure

export function debugVendorData(vendor) {
  console.log('🔍 Vendor Data Debug:');
  console.log('Vendor object:', vendor);
  
  if (!vendor) {
    console.log('❌ No vendor data found');
    return;
  }
  
  console.log('📋 Vendor fields:');
  console.log('- businessName:', vendor.businessName);
  console.log('- name:', vendor.name);
  console.log('- category:', vendor.category);
  console.log('- socialMediaUrl:', vendor.socialMediaUrl);
  console.log('- phone:', vendor.phone);
  console.log('- email:', vendor.email);
  console.log('- whatsapp:', vendor.whatsapp);
  console.log('- platformVerified:', vendor.platformVerified);
  console.log('- communityVerified:', vendor.communityVerified);
  console.log('- rating:', vendor.rating);
  console.log('- reviews:', vendor.reviews);
  
  // Check localStorage directly
  console.log('\n📦 localStorage data:');
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
  const currentVendor = vendors.find(v =>
    String(v.id) === String(user?.id) ||
    (v.email && v.email === user?.email)
  );
  
  console.log('Current user:', user);
  console.log('Current vendor from localStorage:', currentVendor);
  console.log('Total vendors in localStorage:', vendors.length);
}

// Make available in console
window.debugVendorData = debugVendorData;

console.log('🔧 Vendor data debug loaded. Run: debugVendorData(vendor) in the vendor dashboard');
