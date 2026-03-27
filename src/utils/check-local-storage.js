/* src/utils/check-local-storage.js */
// Check what's in localStorage

export function checkLocalStorage() {
  console.log('🔍 Checking localStorage contents:');
  
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const vendors = JSON.parse(localStorage.getItem("vendors") || "[]");
  const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  const userSearches = JSON.parse(localStorage.getItem("userSearches") || "[]");
  
  console.log('👤 User from localStorage:', user);
  console.log('🏪 Total vendors in localStorage:', vendors.length);
  console.log('📋 All vendors:', vendors);
  console.log('⭐ Total reviews:', reviews.length);
  console.log('🔍 User searches:', userSearches);
  
  if (user && vendors.length > 0) {
    const currentVendor = vendors.find(v =>
      String(v.id) === String(user.id) ||
      (v.email && v.email === user.email)
    );
    console.log('🎯 Current vendor for user:', currentVendor);
  }
}

// Make available in console
window.checkLocalStorage = checkLocalStorage;

console.log('🔧 LocalStorage checker loaded. Run: checkLocalStorage()');
